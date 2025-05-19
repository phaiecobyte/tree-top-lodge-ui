import { Component, OnDestroy, OnInit } from '@angular/core';
import { Accommodation } from '../../../shared/models/accommodation.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccommodationService } from '../../../core/services/accommodation.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-accommodation',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './accommodation.component.html',
  styleUrl: './accommodation.component.scss'
})
export class AccommodationComponent implements OnInit, OnDestroy {
  accommodations: Accommodation[] = [];
  accommodationForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showForm: boolean = false;
  isEditing: boolean = false;
  currentAccommodationId: string | null = null;
  deleteAccommodationId: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private fb: FormBuilder
  ) {
    this.accommodationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadAccommodations();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAccommodations(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    const sub = this.accommodationService.getAllAccommodations().subscribe({
      next: (data) => {
        this.accommodations = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching accommodations:', error);
        this.errorMessage = 'Failed to load accommodations. Please try again.';
        this.isLoading = false;
      }
    });
    
    this.subscriptions.push(sub);
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type: ['Treehouse', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      additionalImages: [''],
      pricePerNight: [0, [Validators.required, Validators.min(0)]],
      maxGuests: [1, [Validators.required, Validators.min(1)]],
      beds: ['', Validators.required],
      bathrooms: ['', Validators.required],
      features: ['']
    });
  }

  showAddForm(): void {
    this.isEditing = false;
    this.currentAccommodationId = null;
    this.accommodationForm.reset({
      type: 'Treehouse',
      pricePerNight: 0,
      maxGuests: 1
    });
    this.showForm = true;
  }

  editAccommodation(accommodation: Accommodation): void {
    this.isEditing = true;
    this.currentAccommodationId = accommodation.id || null;
    
    this.accommodationForm.setValue({
      name: accommodation.name,
      type: accommodation.type,
      description: accommodation.description,
      imageUrl: accommodation.imageUrl,
      additionalImages: accommodation.images.slice(1).join(','),
      pricePerNight: accommodation.pricePerNight,
      maxGuests: accommodation.maxGuests,
      beds: accommodation.beds,
      bathrooms: accommodation.bathrooms,
      features: accommodation.features.join(',')
    });
    
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.accommodationForm.reset();
  }

  saveAccommodation(): void {
    if (this.accommodationForm.invalid) return;
    
    const formValue = this.accommodationForm.value;
    const additionalImagesList = formValue.additionalImages ? 
      formValue.additionalImages.split(',').map((url: string) => url.trim()) : [];
      
    const accommodationData: Accommodation = {
      name: formValue.name,
      type: formValue.type,
      description: formValue.description,
      imageUrl: formValue.imageUrl,
      images: [formValue.imageUrl, ...additionalImagesList],
      pricePerNight: +formValue.pricePerNight,
      maxGuests: +formValue.maxGuests,
      beds: formValue.beds,
      bathrooms: formValue.bathrooms,
      features: formValue.features ? formValue.features.split(',').map((feature: string) => feature.trim()) : []
    };
    
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    if (this.isEditing && this.currentAccommodationId) {
      // Update existing accommodation
      const sub = this.accommodationService.updateAccommodation(this.currentAccommodationId, accommodationData).subscribe({
        next: () => {
          this.successMessage = 'Accommodation updated successfully!';
          this.isLoading = false;
          this.showForm = false;
          this.loadAccommodations();
        },
        error: (error) => {
          console.error('Error updating accommodation:', error);
          this.errorMessage = 'Failed to update accommodation. Please try again.';
          this.isLoading = false;
        }
      });
      
      this.subscriptions.push(sub);
    } else {
      // Add new accommodation
      const sub = this.accommodationService.addAccommodation(accommodationData).subscribe({
        next: () => {
          this.successMessage = 'New accommodation added successfully!';
          this.isLoading = false;
          this.showForm = false;
          this.loadAccommodations();
        },
        error: (error) => {
          console.error('Error adding accommodation:', error);
          this.errorMessage = 'Failed to add accommodation. Please try again.';
          this.isLoading = false;
        }
      });
      
      this.subscriptions.push(sub);
    }
  }

  deleteAccommodation(accommodation: Accommodation): void {
    if (!accommodation.id) return;
    this.deleteAccommodationId = accommodation.id;
    
    // Initialize and show the modal
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete(): void {
    if (!this.deleteAccommodationId) return;
    
    this.isLoading = true;
    this.errorMessage = null;
    
    const sub = this.accommodationService.deleteAccommodation(this.deleteAccommodationId).subscribe({
      next: () => {
        this.successMessage = 'Accommodation deleted successfully!';
        this.isLoading = false;
        this.loadAccommodations();
        
    
      },
      error: (error) => {
        console.error('Error deleting accommodation:', error);
        this.errorMessage = 'Failed to delete accommodation. Please try again.';
        this.isLoading = false;
      }
    });
    
    this.subscriptions.push(sub);
  }
}
