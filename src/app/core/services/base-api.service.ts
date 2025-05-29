import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PageResponse<T> {
  // Support both old and new response formats
  data?: T[];           // New format field
  content?: T[];        // Old format field
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty?: boolean;
  success?: boolean;    // New format field
  message?: string;     // New format field
  timestamp?: string;   // New format field
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T> {
  constructor(
    @Inject('endpoint') protected endpoint: string,
    protected http: HttpClient
  ) { }

  get apiUrl() {
    return 'http://localhost:8080/api/v1/';
  }

  /**
   * Get all entities with pagination
   */
  getAll(pageRequest?: PageRequest): Observable<PageResponse<T>> {
    let params = new HttpParams();
    
    if (pageRequest) {
      if (pageRequest.page !== undefined) {
        params = params.set('page', pageRequest.page.toString());
      }
      
      if (pageRequest.size !== undefined) {
        params = params.set('size', pageRequest.size.toString());
      }
      
      if (pageRequest.sort) {
        params = params.set('sort', pageRequest.sort);
      }
    }
    
    return this.http.get<PageResponse<T>>(`${this.apiUrl}${this.endpoint}`, { params });
  }

  /**
   * Get entities with normalized response
   * This method ensures a consistent interface regardless of API response format
   */
  getAllNormalized(pageRequest?: PageRequest): Observable<PageResponse<T>> {
    return this.getAll(pageRequest).pipe(
      map(response => this.normalizeResponse(response))
    );
  }

  /**
   * Normalize response to handle both old and new API formats
   */
  private normalizeResponse(response: PageResponse<T>): PageResponse<T> {
    // Create a normalized response object
    const normalized: PageResponse<T> = {
      content: response.data || response.content || [],
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      size: response.size,
      number: response.number,
      first: response.first,
      last: response.last,
      empty: response.empty || (response.data?.length === 0 || response.content?.length === 0)
    };
    
    return normalized;
  }

  /**
   * Get all entities without pagination
   */
  getAllNoPaging(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.endpoint}/all`);
  }

  /**
   * Get a single entity by ID
   */
  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.endpoint}/${id}`);
  }

  /**
   * Create a new entity
   */
  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${this.endpoint}`, entity);
  }

  /**
   * Update an existing entity
   */
  update(entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${this.endpoint}`, entity);
  }

  /**
   * Delete an entity by ID
   */
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.endpoint}/${id}`);
  }

  /**
   * Search entities with pagination
   */
  search(searchTerm: string, pageRequest?: PageRequest): Observable<PageResponse<T>> {
    let params = new HttpParams().set('query', searchTerm);
    
    if (pageRequest) {
      if (pageRequest.page !== undefined) {
        params = params.set('page', pageRequest.page.toString());
      }
      
      if (pageRequest.size !== undefined) {
        params = params.set('size', pageRequest.size.toString());
      }
      
      if (pageRequest.sort) {
        params = params.set('sort', pageRequest.sort);
      }
    }
    
    return this.http.get<PageResponse<T>>(`${this.apiUrl}${this.endpoint}/search`, { params });
  }

  /**
   * Upload a file related to an entity
   */
  uploadFile(id: string | number, file: File, fileType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    
    return this.http.post<any>(`${this.apiUrl}${this.endpoint}/${id}/upload`, formData);
  }

  /**
   * Upload multiple files related to an entity
   */
  uploadMultipleFiles(id: string | number, files: File[], fileType: string): Observable<any> {
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    
    formData.append('fileType', fileType);
    
    return this.http.post<any>(`${this.apiUrl}${this.endpoint}/${id}/uploads`, formData);
  }

  /**
   * Helper method to build HttpParams from any object
   */
  protected buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    
    return httpParams;
  }
}