import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { BaseApiService, PageRequest, PageResponse } from './base-api.service';

export interface Accommodation {
  id: number;
  accommodationId: string;
  name: string;
  type: string;
  description: string;
  mainImgUrl: string;  // Match server field name
  additionalImgUrls: string[];  // Match server field name
  pricePerNight: number;
  maxGuests: number;
  beds: number;
  bathrooms: number;
  features: string[];
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AccommodationService extends BaseApiService<Accommodation> {
  constructor(http: HttpClient) {
    super('accommodations', http);
  }

  /**
   * Override the base method to handle file uploads for the main image
   */
  override create(accommodation: any): Observable<Accommodation> {
    // Handle file uploads before creating the accommodation
    if (accommodation.mainImage instanceof File) {
      return this.handleImageUploads(accommodation).pipe(
        switchMap(updatedAccommodation => {
          // Now call the parent create method with the updated data
          return super.create(updatedAccommodation);
        })
      );
    }
    return super.create(accommodation);
  }

  /**
   * Override the base method to handle file uploads for updates
   */
  override update(accommodation: any): Observable<Accommodation> {
    // Handle file uploads before updating the accommodation
    if (accommodation.mainImage instanceof File) {
      return this.handleImageUploads(accommodation).pipe(
        switchMap(updatedAccommodation => {
          // Now call the parent update method with the updated data
          return super.update(updatedAccommodation);
        })
      );
    }
    return super.update(accommodation);
  }

  /**
   * Private method to handle image uploads and convert to URLs
   */
  private handleImageUploads(accommodation: any): Observable<any> {
    // Create a copy of the accommodation data
    const updatedAccommodation = { ...accommodation };
    
    // TODO: Implement actual file upload logic here
    // For now, we'll simulate it
    
    if (updatedAccommodation.mainImage instanceof File) {
      // In a real application, you would upload the file and get a URL
      updatedAccommodation.mainImgUrl = 'mock-image-url.jpg';
      delete updatedAccommodation.mainImage;
    }
    
    const additionalImages = updatedAccommodation.additionalImages || [];
    if (Array.isArray(additionalImages) && additionalImages.length > 0 && 
        additionalImages[0] instanceof File) {
      // In a real application, you would upload each file and get URLs
      updatedAccommodation.additionalImgUrls = additionalImages.map((_: any, i: number) => 
        `mock-additional-image-${i}.jpg`);
      delete updatedAccommodation.additionalImages;
    }
    
    // Return an Observable that emits the updated accommodation
    return new Observable(observer => {
      observer.next(updatedAccommodation);
      observer.complete();
    });
  }
}