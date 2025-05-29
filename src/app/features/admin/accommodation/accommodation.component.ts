import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccommodationService } from '../../../core/services/accommodation.service';
import { DataTableComponent } from '../../../shared/components/data-display/data-table.component';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { TextInputComponent } from "../../../shared/components/control/text-input.component";
import { SelectInputComponent } from "../../../shared/components/control/select-input.component";
import { TextareaInputComponent } from "../../../shared/components/control/textarea-input.component";
import { ImageUploadComponent } from "../../../shared/components/control/file-upload.component";
import { MultiImageUploadComponent } from "../../../shared/components/control/multi-file-upload.component";

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableComponent,
    ModalComponent,
    TextInputComponent,
    SelectInputComponent,
    TextareaInputComponent,
    ImageUploadComponent,
    MultiImageUploadComponent
  ],
  templateUrl: './accommodation.component.html',
  styleUrl: './accommodation.component.scss'
})
export class AdminAccommodationComponent implements OnInit {


  @ViewChild('modal') modal!: ModalComponent;
  
  accommodationForm!: FormGroup;
  accommodations: any[] = [];
  loading = false;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  totalPages = 0;
  isEditing = false;
  selectedId: number | null = null;
  
  roomTypeOptions = [
    { value: 'standard', label: 'Standard Room' },
    { value: 'deluxe', label: 'Deluxe Room' },
    { value: 'suite', label: 'Suite' },
    { value: 'villa', label: 'Villa' }
  ];
  
  columns = [
    { header: 'Name', field: 'name', sortable: true },
    { header: 'Type', field: 'type', sortable: true },
    { header: 'Price', field: 'pricePerNight', sortable: true, formatter: (val: number) => `$${val}` },
    { header: 'Max Guests', field: 'maxGuests', sortable: true },
    { header: 'Status', field: 'status', sortable: true }
  ];

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAccommodations();
  }

  initForm(): void {
    this.accommodationForm = this.fb.group({
      id: [0],
      accommodationId:[''],
      name: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      pricePerNight: [0, [Validators.required, Validators.min(0)]],
      maxGuests: [1, [Validators.required, Validators.min(1)]],
      beds: [1, Validators.required],
      bathrooms: [1, Validators.required],
      features: [''],
      mainImage: [null, Validators.required],
      additionalImages: [[]]
    });
  }

  loadAccommodations(): void {
    this.loading = true;
    this.accommodationService.getAllNormalized({
      page: this.currentPage,
      size: this.pageSize,
      sort: 'name,asc'
    }).subscribe({
      next: (response) => {
        // The response is now normalized, so you can always use response.content
        this.accommodations = response.content || [];
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
        this.loading = false;
        console.log("Accommodations loaded:", this.accommodations);
      },
      error: (error) => {
        console.error('Error loading accommodations', error);
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAccommodations();
  }

  onSortChange(event: any): void {
    // Implement sorting
    this.loadAccommodations();
  }

  onSearch(term: string): void {
    // Implement search
    this.loadAccommodations();
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedId = null;
    this.accommodationForm.reset({
      pricePerNight: 0,
      maxGuests: 1,
      beds: 1,
      bathrooms: 1,
      type: '',
      features: '',
      mainImage: null,
      additionalImages: []
    });
    this.modal.show();
  }

  editAccommodation(accommodation: any): void {
    this.isEditing = true;
    this.selectedId = accommodation.id;
    
    // Reset the form first to clear any previous values
    this.accommodationForm.reset();
    
    // Patch the form with accommodation data
    this.accommodationForm.patchValue({
      id: accommodation.id,
      name: accommodation.name,
      description: accommodation.description,
      type: accommodation.type,
      pricePerNight: accommodation.pricePerNight,
      maxGuests: accommodation.maxGuests,
      beds: accommodation.beds,
      bathrooms: accommodation.bathrooms,
      features: accommodation.features.join(', '), // Convert array to comma-separated string
      // For images, we need to handle them differently
      mainImage: accommodation.imageUrl, // This will be a URL string
      additionalImages: accommodation.additionalImages || [] // Array of URLs
    });
    
    this.modal.show();
  }

  deleteAccommodation(accommodation: any): void {
    if (confirm(`Are you sure you want to delete ${accommodation.name}?`)) {
      this.accommodationService.delete(accommodation.id).subscribe({
        next: () => {
          this.loadAccommodations();
        },
        error: (error) => {
          console.error('Error deleting accommodation', error);
        }
      });
    }
  }

  onMainImageSelected(file: File): void {
    console.log('Main image selected:', file.name, file.size);
    // You can perform additional actions here if needed
  }

  onAdditionalImagesSelected(files: File[]): void {
    console.log('Additional images selected:', files.length);
    files.forEach(file => {
      console.log('- ', file.name, file.size);
    });
    // You can perform additional actions here if needed
  }

  saveAccommodation(): void {
    if (this.accommodationForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.accommodationForm.controls).forEach(key => {
        const control = this.accommodationForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    const formData = this.accommodationForm.value;
    
    // Process features from comma-separated string to array
    if (typeof formData.features === 'string') {
      formData.features = formData.features
        .split(',')
        .map((feature: string) => feature.trim())
        .filter((feature: string) => feature.length > 0);
    }
    
    // Here you would typically:
    // 1. Upload the main image and get the URL
    // 2. Upload the additional images and get the URLs
    // 3. Update the formData with the URLs
    // 4. Save the accommodation data
    
    // For this example, we'll simulate the process:
    console.log('Saving accommodation:', formData);
    
    // Handle main image - in a real app, upload the file and get a URL
    const mainImageFile = formData.mainImage;
    if (mainImageFile instanceof File) {
      console.log('Uploading main image:', mainImageFile.name);
      // Here you would call a service to upload the file
      // Then update formData.mainImage with the returned URL
    }
    
    // Handle additional images
    const additionalImageFiles = formData.additionalImages || [];
    if (Array.isArray(additionalImageFiles) && additionalImageFiles.length > 0) {
      console.log('Uploading additional images:', additionalImageFiles.length);
      // Here you would call a service to upload each file
      // Then update formData.additionalImages with the returned URLs
    }
    
    // Save accommodation data
    const saveObservable = this.isEditing 
      ? this.accommodationService.update(formData)
      : this.accommodationService.create(formData);
      
    saveObservable.subscribe({
      next: () => {
        this.modal.hide();
        this.loadAccommodations();
      },
      error: (error) => {
        console.error('Error saving accommodation', error);
      }
    });
  }
}