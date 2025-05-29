import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = getStorage();
    uploadFile(file: File, path: string): Observable<string> {
    if (!file) {
      return throwError(() => new Error('No file provided for upload'));
    }
    
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = `${path}/${fileName}`;
    const storageRef = ref(this.storage, filePath);
    
    console.log('Uploading file to path:', filePath);
    
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap(() => {
        console.log('File uploaded successfully, getting download URL');
        return from(getDownloadURL(storageRef));
      }),
      catchError(err => {
        console.error('Error uploading file:', err);
        return throwError(() => new Error(`Failed to upload file: ${err.message}`));
      })
    );
  }
  
  deleteFile(fileUrl: string): Observable<void> {
    try {
      const fileRef = ref(this.storage, fileUrl);
      return from(deleteObject(fileRef)).pipe(
        catchError(err => {
          console.error('Error deleting file:', err);
          return throwError(() => new Error(`Failed to delete file: ${err.message}`));
        })
      );
    } catch (error) {
      console.error('Unexpected error in deleteFile:', error);
      return throwError(() => new Error('An unexpected error occurred during file deletion'));
    }
  }
}