import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { BaseApiService, PageRequest, PageResponse } from './base-api.service';
import { FileUploadService } from './file-upload.service';
import { AuthService } from '../authentication/auth.service';

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
  constructor(
    http: HttpClient,
    authService: AuthService // Add AuthService
  ) {
    super('accommodations', http, authService); // Pass authService to parent
  }

  // /**
  //  * Override the base method to handle file uploads for the main image
  //  */
  // override create(accommodation: any): Observable<Accommodation> {
  //   // Handle file uploads before creating the accommodation
  //   return this.handleImageUploads(accommodation).pipe(
  //     switchMap(updatedAccommodation => {
  //       // Now call the parent create method with the updated data
  //       return super.create(updatedAccommodation);
  //     })
  //   );
  // }

  // /**
  //  * Override the base method to handle file uploads for updates
  //  */
  // override update(accommodation: any): Observable<Accommodation> {
  //   // Handle file uploads before updating the accommodation
  //   return this.handleImageUploads(accommodation).pipe(
  //     switchMap(updatedAccommodation => {
  //       // Now call the parent update method with the updated data
  //       return super.update(updatedAccommodation);
  //     })
  //   );
  // }

  // /**
  //  * Private method to handle image uploads and convert to URLs
  //  * This method processes all images (main and additional) and returns 
  //  * accommodation data with URL strings instead of File objects
  //  * 
  //  * @param accommodation The accommodation data with potential file objects
  //  * @returns Observable that emits accommodation data with image URLs
  //  */
  // private handleImageUploads(accommodation: any): Observable<any> {
  //   // Create a copy of the accommodation data to avoid modifying the original
  //   const updatedAccommodation = { ...accommodation };
    
  //   // Array to store all upload observables
  //   const uploadObservables: Observable<any>[] = [];
    
  //   // Process the main image if it's a File object
  //   if (updatedAccommodation.mainImage instanceof File) {
  //     // Create an observable for uploading the main image
  //     const mainImageUpload = this.fileUploadService.uploadSingleFile(
  //       updatedAccommodation.mainImage,
  //       'accommodations/main-image' // Directory to store images
  //     ).pipe(
  //       // Once we get the URL back, update the accommodation object
  //       switchMap(fileUrl => {
  //         // Set the URL in the proper field for the API
  //         updatedAccommodation.mainImgUrl = fileUrl;
  //         // Remove the File object from the data
  //         delete updatedAccommodation.mainImage;
  //         return of(true); // Return an observable to continue the chain
  //       })
  //     );
      
  //     // Add this upload to our array of observables
  //     uploadObservables.push(mainImageUpload);
  //   } else if (typeof updatedAccommodation.mainImage === 'string') {
  //     // If mainImage is already a URL string (edit mode)
  //     updatedAccommodation.mainImgUrl = updatedAccommodation.mainImage;
  //     delete updatedAccommodation.mainImage;
  //   }
    
  //   // Process additional images if they exist and are File objects
  //   const additionalImages = updatedAccommodation.additionalImages || [];
  //   if (Array.isArray(additionalImages) && additionalImages.length > 0) {
  //     // Check if the first item is a File (which means they all should be)
  //     if (additionalImages[0] instanceof File) {
  //       // Create an observable for uploading multiple files at once
  //       const additionalImagesUpload = this.fileUploadService.uploadMultipleFiles(
  //         additionalImages,
  //         'accommodations/additional-images' // Directory to store images
  //       ).pipe(
  //         // Once we get the URLs back, update the accommodation object
  //         switchMap(fileUrls => {
  //           // Set the URLs in the proper field for the API
  //           updatedAccommodation.additionalImgUrls = fileUrls;
  //           // Remove the File objects from the data
  //           delete updatedAccommodation.additionalImages;
  //           return of(true); // Return an observable to continue the chain
  //         })
  //       );
        
  //       // Add this upload to our array of observables
  //       uploadObservables.push(additionalImagesUpload);
  //     } else if (typeof additionalImages[0] === 'string') {
  //       // If additionalImages are already URL strings (edit mode)
  //       updatedAccommodation.additionalImgUrls = additionalImages;
  //       delete updatedAccommodation.additionalImages;
  //     }
  //   }
    
  //   // If there are no uploads to process, return the updated object immediately
  //   if (uploadObservables.length === 0) {
  //     return of(updatedAccommodation);
  //   }
    
  //   // Otherwise, wait for all uploads to complete using forkJoin
  //   // forkJoin waits for all observables to complete and then emits a single value
  //   return forkJoin(uploadObservables).pipe(
  //     // Once all uploads are complete, return the updated accommodation
  //     switchMap(() => of(updatedAccommodation))
  //   );
  // }
}