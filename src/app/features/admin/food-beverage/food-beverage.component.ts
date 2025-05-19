import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FoodBeverageService } from '../../../core/services/foodbeverage.service';
import { FoodBeverage } from '../../../shared/models/food-beverage.model';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

// For Bootstrap modals
declare var bootstrap: any;

@Component({
  selector: 'app-food-beverage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './food-beverage.component.html',
  styleUrls: ['./food-beverage.component.scss']
})
export class AdminFoodBeverageComponent implements OnInit, OnDestroy {
  // Data
  foodBeverageItems: FoodBeverage[] = [];
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks'];
  selectedCategory: string | null = null;
  currentItemId:any;
  
  // UI state
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  // Form
  foodBeverageForm: FormGroup;
  
  // Modal references
  itemModal: any;
  deleteModal: any;
  
  // Subscriptions for cleanup
  private subscriptions: Subscription[] = [];
  
  constructor(
    private fb: FormBuilder,
    private foodBeverageService: FoodBeverageService
  ) {
    this.foodBeverageForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]],
      rating: [5, [Validators.min(1), Validators.max(5)]],
      category: ['', [Validators.required]],
      available: [true]
    });
  }
  
  ngOnInit(): void {
    this.loadItems();
    this.initializeModals();
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  // Load items with optional category filter
  loadItems(category?: string): void {
    this.isLoading = true;
    this.selectedCategory = category || null;
    
    const subscription = this.foodBeverageService.getAllItems(category)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (items) => {
          this.foodBeverageItems = items;
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error loading items:', error);
          this.errorMessage = 'Failed to load items. Please try again.';
          this.foodBeverageItems = [];
        }
      });
    
    this.subscriptions.push(subscription);
  }
  
  // Initialize Bootstrap modals
  initializeModals(): void {
    setTimeout(() => {
      const itemModalElement = document.getElementById('itemModal');
      const deleteModalElement = document.getElementById('deleteConfirmationModal');
      
      if (itemModalElement) {
        this.itemModal = new bootstrap.Modal(itemModalElement);
      }
      
      if (deleteModalElement) {
        this.deleteModal = new bootstrap.Modal(deleteModalElement);
      }
    }, 0);
  }
  
  // Open modal for creating a new item
  openCreateModal(): void {
    this.currentItemId = null;
    this.foodBeverageForm.reset({
      rating: 5,
      available: true
    });
    this.itemModal?.show();
  }
  
  // Open modal for editing an existing item
  openEditModal(item: FoodBeverage): void {
    this.currentItemId = item.id?.toString();
    this.foodBeverageForm.setValue({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      rating: item.rating,
      category: item.category,
      available: item.available
    });
    this.itemModal?.show();
  }
  
  // Open confirmation modal for deleting an item
  openDeleteModal(item: FoodBeverage): void {
    this.currentItemId = item.id?.toString();
    this.deleteModal?.show();
  }
  
  // Save new or update existing item
  saveItem(): void {
    if (this.foodBeverageForm.invalid) {
      this.foodBeverageForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    const itemData = this.foodBeverageForm.value;
    
    // Update existing item
    if (this.currentItemId) {
      const subscription = this.foodBeverageService.updateItem(this.currentItemId, itemData)
        .pipe(finalize(() => {
          this.isLoading = false;
          this.itemModal?.hide();
        }))
        .subscribe({
          next: () => {
            this.successMessage = 'Item updated successfully!';
            this.loadItems(this.selectedCategory || undefined);
            setTimeout(() => this.successMessage = null, 3000);
          },
          error: (error) => {
            console.error('Error updating item:', error);
            this.errorMessage = 'Failed to update item. Please try again.';
            setTimeout(() => this.errorMessage = null, 5000);
          }
        });
      
      this.subscriptions.push(subscription);
    } 
    // Create new item
    else {
      const subscription = this.foodBeverageService.addItem(itemData)
        .pipe(finalize(() => {
          this.isLoading = false;
          this.itemModal?.hide();
        }))
        .subscribe({
          next: () => {
            this.successMessage = 'Item added successfully!';
            this.loadItems(this.selectedCategory || undefined);
            setTimeout(() => this.successMessage = null, 3000);
          },
          error: (error) => {
            console.error('Error adding item:', error);
            this.errorMessage = 'Failed to add item. Please try again.';
            setTimeout(() => this.errorMessage = null, 5000);
          }
        });
      
      this.subscriptions.push(subscription);
    }
  }
  
  // Delete the currently selected item
  confirmDelete(): void {
    if (!this.currentItemId) return;
    
    this.isLoading = true;
    
    const subscription = this.foodBeverageService.deleteItem(this.currentItemId)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.deleteModal?.hide();
      }))
      .subscribe({
        next: () => {
          this.successMessage = 'Item deleted successfully!';
          this.loadItems(this.selectedCategory || undefined);
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.errorMessage = 'Failed to delete item. Please try again.';
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
    
    this.subscriptions.push(subscription);
  }
  
  // Filter by category
  filterByCategory(category: string | null): void {
    this.loadItems(category || undefined);
  }
  
  // Helper to get form control errors for validation messages
  hasError(controlName: string, errorName: string): boolean {
    const control = this.foodBeverageForm.get(controlName);
    return control !== null && control.touched && control.hasError(errorName);
  }
  
  // Format date for display
  formatDate(date: Date): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
