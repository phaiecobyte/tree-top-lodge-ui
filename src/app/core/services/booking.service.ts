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
import { Observable, from } from 'rxjs';

export interface Booking {
  id?: string;
  accommodationId: string;
  guestName: string;
  email: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsCollection = 'bookings';
  
  constructor(private firestore: Firestore) {}

  // Create a new booking
  createBooking(booking: Booking): Observable<any> {
    const bookingData = {
      ...booking,
      createdAt: new Date()
    };
    const collectionRef = collection(this.firestore, this.bookingsCollection);
    return from(addDoc(collectionRef, bookingData));
  }

  // Get all bookings for an accommodation
  getBookingsByAccommodationId(accommodationId: string): Observable<Booking[]> {
    const collectionRef = collection(this.firestore, this.bookingsCollection);
    const q = query(collectionRef, where('accommodationId', '==', accommodationId));
    return collectionData(q, { idField: 'id' }) as Observable<Booking[]>;
  }

  // Get booking by ID
  getBookingById(id: string): Observable<Booking> {
    const docRef = doc(this.firestore, `${this.bookingsCollection}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Booking>;
  }

  // Update booking status
  updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Observable<any> {
    const docRef = doc(this.firestore, `${this.bookingsCollection}/${id}`);
    return from(updateDoc(docRef, { status }));
  }

  // Delete a booking
  deleteBooking(id: string): Observable<any> {
    const docRef = doc(this.firestore, `${this.bookingsCollection}/${id}`);
    return from(deleteDoc(docRef));
  }
}