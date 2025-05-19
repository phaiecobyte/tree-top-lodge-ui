import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Accommodation } from '../../../shared/models/accommodation.model';
import { AccommodationService } from '../../../core/services/accommodation.service';

declare var bootstrap: any;

@Component({
  selector: 'app-accomodation',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.scss']
})
export class AccomodationComponent implements OnInit, OnDestroy {
  // Filter properties
  filterRoomType: string = 'all';
  filterGuests: string = 'any';
  priceRange: number = 300;
  
  // Selected room for modal
  selectedRoom: any = null;
  bookingModal: any;
  
  // Loading state
  isLoading: boolean = true;
  errorMessage: string | null = null;

  // Accommodations data
  accommodations: Accommodation[] = [];
  private accommodationSubscription: Subscription | undefined;

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit() {
    // Fetch accommodations from Firebase
    this.isLoading = true;
    this.accommodationSubscription = this.accommodationService.getAllAccommodations()
      .subscribe({
        next: (data) => {
          this.accommodations = data;
          this.isLoading = false;
          
          // Initialize the modal after data is loaded and DOM is updated
          setTimeout(() => {
            const modalElement = document.getElementById('bookingModal');
            if (modalElement) {
              this.bookingModal = new bootstrap.Modal(modalElement);
            }
          }, 0);
        },
        error: (error) => {
          console.error('Error fetching accommodations:', error);
          this.errorMessage = 'Unable to load accommodations. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.accommodationSubscription) {
      this.accommodationSubscription.unsubscribe();
    }
  }

  // Filter accommodations based on user selections
  filteredAccommodations() {
    return this.accommodations.filter(room => {
      // Filter by room type
      if (this.filterRoomType !== 'all' && room.type.toLowerCase() !== this.filterRoomType.toLowerCase()) {
        return false;
      }

      // Filter by price
      if (room.pricePerNight > this.priceRange) {
        return false;
      }

      // Filter by guests
      if (this.filterGuests !== 'any') {
        const guests = room.maxGuests;
        if (this.filterGuests === '1-2' && (guests < 1 || guests > 2)) return false;
        if (this.filterGuests === '3-4' && (guests < 3 || guests > 4)) return false;
        if (this.filterGuests === '5+' && guests < 5) return false;
      }

      return true;
    });
  }

  // Reset all filters
  resetFilters() {
    this.filterRoomType = 'all';
    this.filterGuests = 'any';
    this.priceRange = 300;
  }

  // Open booking modal
  openBookingModal(room: Accommodation) {
    this.selectedRoom = room;
    if (this.bookingModal) {
      this.bookingModal.show();
    }
  }
}
