import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = `${environment.apiUrl}/upload`;

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {}

  /**
   * Get authorization headers with the current token
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Upload a single file to the server
   * 
   * @param file The file to upload
   * @param directory The directory to upload to (e.g., 'accommodations')
   * @returns Observable with the uploaded file URL
   */
  uploadSingleFile(file: File, directory: string): Observable<string> {
    // Create form data object to send file
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Make the HTTP request with authorization headers
    return this.http.post<string>(
      `${this.apiUrl}/single?directory=${directory}`, 
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Upload multiple files to the server
   * 
   * @param files An array of files to upload
   * @param directory The directory to upload to (e.g., 'accommodations')
   * @returns Observable with array of uploaded file URLs
   */
  uploadMultipleFiles(files: File[], directory: string): Observable<string[]> {
    // Create form data object to send files
    const formData = new FormData();
    
    // Append each file to the formData with the same field name 'files'
    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    // Make the HTTP request with authorization headers
    return this.http.post<string[]>(
      `${this.apiUrl}/multiple?directory=${directory}`, 
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Delete a single file from the server
   * 
   * @param fileUrl The URL of the file to delete
   * @returns Observable of the delete operation result
   */
  deleteSingleFile(fileUrl: string): Observable<any> {
    // URL encode the fileUrl parameter
    const encodedUrl = encodeURIComponent(fileUrl);
    
    // Make the HTTP request with authorization headers
    return this.http.delete(
      `${this.apiUrl}/single?fileUrl=${encodedUrl}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Delete multiple files from the server
   * 
   * @param fileUrls Array of file URLs to delete
   * @returns Observable of the delete operation result
   */
  deleteMultipleFiles(fileUrls: string[]): Observable<any> {
    // Make the HTTP request with authorization headers and the file URLs in the request body
    return this.http.delete(
      `${this.apiUrl}/multiple`,
      { 
        headers: this.getAuthHeaders(),
        body: fileUrls 
      }
    );
  }

}