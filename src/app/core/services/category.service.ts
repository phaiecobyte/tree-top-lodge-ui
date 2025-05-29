import { Injectable } from '@angular/core';
import { 
  Firestore, collection, collectionData, doc, 
  getDoc, addDoc, updateDoc, deleteDoc, DocumentReference
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private collectionName = 'categories';

  constructor(private firestore: Firestore) { }

  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.firestore, this.collectionName);
    return collectionData(categoriesRef, { idField: 'id' }) as Observable<Category[]>;
  }

  getCategoryById(id: string): Observable<Category> {
    const categoryDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(getDoc(categoryDocRef)).pipe(
      map(docSnap => {
        if (!docSnap.exists()) {
          throw new Error(`Category with ID ${id} not found`);
        }
        return { id: docSnap.id, ...docSnap.data() } as Category;
      })
    );
  }

  addCategory(category: Omit<Category, 'id'>): Observable<DocumentReference> {
    const categoriesRef = collection(this.firestore, this.collectionName);
    return from(addDoc(categoriesRef, category));
  }

  updateCategory(id: string, data: Partial<Category>): Observable<void> {
    const categoryDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(updateDoc(categoryDocRef, data));
  }

  deleteCategory(id: string): Observable<void> {
    const categoryDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(deleteDoc(categoryDocRef));
  }
}