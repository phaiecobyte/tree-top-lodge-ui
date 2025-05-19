import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from '@angular/fire/firestore';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Accommodation } from '../../shared/models/accommodation.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationsCollection = 'accommodations';
  
  constructor(private firestore: Firestore) {}

  // Get all accommodations
  getAllAccommodations(): Observable<Accommodation[]> {
    const collectionRef = collection(this.firestore, 'accommodations');
    return collectionData(collectionRef, { idField: 'id' }).pipe(
      map(items => items as Accommodation[]),
      catchError(error => {
        console.error('Error fetching accommodations:', error);
        return throwError(() => new Error(`Failed to load accommodations: ${error.message}`));
      })
    );
  }

  // Get a specific accommodation by ID
  getAccommodationById(id: string): Observable<Accommodation> {
    const docRef = doc(this.firestore, `${this.accommodationsCollection}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Accommodation>;
  }

  // Get accommodations by type
  getAccommodationsByType(type: string): Observable<Accommodation[]> {
    const collectionRef = collection(this.firestore, this.accommodationsCollection);
    const q = query(collectionRef, where('type', '==', type));
    return collectionData(q, { idField: 'id' }) as Observable<Accommodation[]>;
  }

  // Add a new accommodation
  addAccommodation(accommodation: Accommodation): Observable<any> {
    const collectionRef = collection(this.firestore, this.accommodationsCollection);
    return from(addDoc(collectionRef, accommodation));
  }

  // Update an accommodation
  updateAccommodation(id: string, accommodation: Partial<Accommodation>): Observable<any> {
    const docRef = doc(this.firestore, `${this.accommodationsCollection}/${id}`);
    return from(updateDoc(docRef, accommodation));
  }

  // Delete an accommodation
  deleteAccommodation(id: string): Observable<any> {
    const docRef = doc(this.firestore, `${this.accommodationsCollection}/${id}`);
    return from(deleteDoc(docRef));
  }
}