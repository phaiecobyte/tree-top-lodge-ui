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
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from '@angular/fire/firestore';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FoodBeverage } from '../../shared/models/food-beverage.model';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FoodBeverageService {
  private collectionName = 'food-beverage';
  
  constructor(private firestore: Firestore) {}

  getAllItems(category?: string): Observable<FoodBeverage[]> {
    const fbCollection = collection(this.firestore, this.collectionName);
    
    // Create query based on optional category filter
    const fbQuery = category ? 
      query(fbCollection, where('category', '==', category), orderBy('name')) :
      query(fbCollection, orderBy('name'));
    
    return collectionData(fbQuery, { idField: 'id' }).pipe(
      map(items => items.map(item => this.convertTimestamps(item)) as FoodBeverage[]),
      catchError(err => {
        console.error('Error fetching food & beverage items:', err);
        return throwError(() => new Error(`Failed to load items: ${err.message}`));
      })
    );
  }

  getItemById(id: string): Observable<FoodBeverage> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }).pipe(
      map(item => this.convertTimestamps(item) as FoodBeverage),
      catchError(err => {
        console.error(`Error fetching item with ID ${id}:`, err);
        return throwError(() => new Error(`Failed to load item: ${err.message}`));
      })
    );
  }

  addItem(item: Omit<FoodBeverage, 'id' | 'createdAt' | 'updatedAt'>): Observable<string> {
    const fbCollection = collection(this.firestore, this.collectionName);
    
    // Add timestamps
    const itemWithTimestamps = {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    return from(addDoc(fbCollection, itemWithTimestamps)).pipe(
      map(docRef => docRef.id),
      catchError(err => {
        console.error('Error adding food & beverage item:', err);
        return throwError(() => new Error(`Failed to add item: ${err.message}`));
      })
    );
  }

  updateItem(id: string, item: Partial<FoodBeverage>): Observable<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    
    // Add updated timestamp
    const itemWithTimestamp = {
      ...item,
      updatedAt: serverTimestamp()
    };
    
    return from(updateDoc(docRef, itemWithTimestamp)).pipe(
      catchError(err => {
        console.error(`Error updating item with ID ${id}:`, err);
        return throwError(() => new Error(`Failed to update item: ${err.message}`));
      })
    );
  }

  deleteItem(id: string): Observable<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(deleteDoc(docRef)).pipe(
      catchError(err => {
        console.error(`Error deleting item with ID ${id}:`, err);
        return throwError(() => new Error(`Failed to delete item: ${err.message}`));
      })
    );
  }

  // Helper to convert Firestore Timestamps to Date objects
  private convertTimestamps(item: any): any {
    if (!item) return item;
    
    const result = { ...item };
    if (result.createdAt && typeof result.createdAt.toDate === 'function') {
      result.createdAt = result.createdAt.toDate();
    }
    if (result.updatedAt && typeof result.updatedAt.toDate === 'function') {
      result.updatedAt = result.updatedAt.toDate();
    }
    
    return result;
  }
}