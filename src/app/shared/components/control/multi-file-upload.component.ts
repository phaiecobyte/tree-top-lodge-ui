import { Component, Input, Optional, Self, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

interface ImageItem {
  file?: File;
  url: string;
  name?: string;
  size?: number;
}

@Component({
  selector: 'app-multi-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      
      <!-- Upload area -->
      <div class="upload-area mb-3" 
           (dragover)="onDragOver($event)" 
           (dragleave)="onDragLeave($event)" 
           (drop)="onDrop($event)"
           [class.is-invalid]="control.invalid && (control.touched || control.dirty)"
           [class.dragover]="isDragging">
        <div class="upload-placeholder text-center p-4">
          <i class="bi bi-images fs-2"></i>
          <p class="mb-1">{{ placeholder }}</p>
          <p class="text-muted small mb-2">{{ hint || 'Click to browse or drag images here' }}</p>
          
          <button type="button" class="btn btn-outline-primary btn-sm" (click)="fileInput.click()">
            <i class="bi bi-upload me-1"></i> Select Files
          </button>
          
          <p *ngIf="images.length > 0" class="mt-2 mb-0 text-success">
            {{ images.length }} image(s) uploaded
          </p>
        </div>
        
        <!-- Hidden file input -->
        <input 
          type="file" 
          class="d-none" 
          #fileInput
          [id]="id"
          [accept]="accept"
          multiple
          (change)="onFileChange($event)"
        >
      </div>
      
      <!-- Error messages -->
      <div *ngIf="control.invalid && (control.touched || control.dirty)" class="invalid-feedback d-block mb-3">
        <div *ngIf="control.errors?.['required']">At least one image is required</div>
        <div *ngIf="control.errors?.['fileType']">Only image files are allowed</div>
        <div *ngIf="control.errors?.['fileSize']">All images must be less than {{ maxSize }} MB</div>
        <div *ngIf="control.errors?.['maxFiles']">Maximum {{ maxFiles }} images allowed</div>
      </div>
      
      <!-- Image preview gallery -->
      <div class="image-gallery" *ngIf="images.length > 0">
        <h6 class="mb-2">Uploaded Images ({{ images.length }})</h6>
        <div class="row row-cols-2 row-cols-md-4 g-2">
          <div class="col" *ngFor="let image of images; let i = index">
            <div class="card h-100 image-card">
              <div class="image-container">
                <img [src]="image.url" class="card-img-top" [alt]="image.name || 'Image ' + (i+1)">
                <div class="image-actions">
                  <button type="button" class="btn btn-sm btn-danger" (click)="removeImage(i)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <div class="card-body p-2">
                <p class="card-text small text-truncate mb-0" [title]="image.name">
                  {{ image.name || 'Image ' + (i+1) }}
                </p>
                <small *ngIf="image.size" class="text-muted">
                  {{ formatFileSize(image.size) }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 4px;
      min-height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    
    .upload-area.dragover {
      background-color: rgba(0, 123, 255, 0.05);
      border-color: #0d6efd;
    }
    
    .upload-area.is-invalid {
      border-color: #dc3545;
    }
    
    .image-container {
      position: relative;
      height: 140px;
      overflow: hidden;
    }
    
    .image-container img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    
    .image-actions {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      background: rgba(0, 0, 0, 0.5);
      border-bottom-left-radius: 5px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    .image-card:hover .image-actions {
      opacity: 1;
    }
  `]
})
export class MultiImageUploadComponent implements ControlValueAccessor {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() label?: string;
  @Input() placeholder = 'Upload Images';
  @Input() hint?: string;
  @Input() accept = 'image/*';
  @Input() maxSize = 5; // In MB
  @Input() maxFiles = 10;
  @Input() id = `multi-image-upload-${Math.random().toString(36).substring(2, 9)}`;
  
  @Output() imagesSelected = new EventEmitter<File[]>();

  control = new FormControl();
  isDragging = false;
  images: ImageItem[] = [];

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.handleFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.updateFormValue();
  }

  handleFiles(files: File[]): void {
    // Check max files limit
    if (this.images.length + files.length > this.maxFiles) {
      this.control.setErrors({ ...this.control.errors, maxFiles: true });
      return;
    }

    const validFiles: File[] = [];

    // Validate files
    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        this.control.setErrors({ ...this.control.errors, fileType: true });
        continue;
      }

      // Check file size
      if (file.size > this.maxSize * 1024 * 1024) {
        this.control.setErrors({ ...this.control.errors, fileSize: true });
        continue;
      }

      validFiles.push(file);
    }

    // Process valid files
    for (const file of validFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push({
          file,
          url: reader.result as string,
          name: file.name,
          size: file.size
        });
        this.updateFormValue();
      };
      reader.readAsDataURL(file);
    }
  }

  updateFormValue(): void {
    // Extract just the File objects for the form value
    const files = this.images
      .filter(img => img.file)
      .map(img => img.file as File);
      
    this.control.setValue(files.length ? files : null);
    this.onChange(files.length ? files : null);
    this.imagesSelected.emit(files);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.images = [];
    
    if (Array.isArray(value)) {
      // Handle existing image URLs from database
      if (typeof value[0] === 'string') {
        this.images = value.map(url => ({ url }));
      } 
      // Handle File objects
      else if (value[0] instanceof File) {
        value.forEach((file: File) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.images.push({
              file,
              url: reader.result as string,
              name: file.name,
              size: file.size
            });
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  onChange: any = () => {};
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched: any = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }
}