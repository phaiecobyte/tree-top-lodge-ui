import { Component, Input, Optional, Self, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      
      <div class="image-upload-container" [class.is-invalid]="control.invalid && (control.touched || control.dirty)">
        <!-- Preview area -->
        <div class="preview-area" *ngIf="previewUrl">
          <img [src]="previewUrl" alt="Image preview" class="img-preview">
          <div class="preview-overlay">
            <button type="button" class="btn btn-sm btn-light" (click)="removeImage($event)">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        
        <!-- Upload area -->
        <div class="upload-area" *ngIf="!previewUrl" 
             (dragover)="onDragOver($event)" 
             (dragleave)="onDragLeave($event)" 
             (drop)="onDrop($event)"
             [class.dragover]="isDragging">
          <div class="upload-placeholder">
            <i class="bi bi-cloud-arrow-up-fill fs-2"></i>
            <p class="mb-1">{{ placeholder }}</p>
            <p class="text-muted small mb-0">{{ hint || 'Click to browse or drag an image here' }}</p>
            
            <button type="button" class="btn btn-outline-primary btn-sm mt-2" (click)="fileInput.click()">
              <i class="bi bi-upload me-1"></i> Select File
            </button>
          </div>
        </div>
        
        <!-- Hidden file input -->
        <input 
          type="file" 
          class="d-none" 
          #fileInput
          [id]="id"
          [accept]="accept"
          (change)="onFileChange($event)"
        >
      </div>
      
      <!-- Error messages -->
      <div *ngIf="control.invalid && (control.touched || control.dirty)" class="invalid-feedback d-block">
        <div *ngIf="control.errors?.['required']">{{ label || 'Image' }} is required</div>
        <div *ngIf="control.errors?.['fileType']">Only image files are allowed</div>
        <div *ngIf="control.errors?.['fileSize']">Image size must be less than {{ maxSize }} MB</div>
      </div>
      
      <small *ngIf="fileName" class="form-text text-muted d-block mt-1">
        {{ fileName }} - {{ formatFileSize(fileSize) }}
      </small>
    </div>
  `,
  styles: [`
    .image-upload-container {
      border: 2px dashed #ccc;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      height: 200px;
    }
    
    .upload-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      padding: 20px;
      cursor: pointer;
    }
    
    .upload-area.dragover {
      background-color: rgba(0, 123, 255, 0.05);
      border-color: #0d6efd;
    }
    
    .preview-area {
      width: 100%;
      height: 100%;
      position: relative;
    }
    
    .img-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .preview-overlay {
      position: absolute;
      top: 0;
      right: 0;
      padding: 8px;
      background: rgba(0, 0, 0, 0.5);
      border-bottom-left-radius: 8px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    .preview-area:hover .preview-overlay {
      opacity: 1;
    }
    
    .is-invalid {
      border-color: #dc3545;
    }
  `]
})
export class ImageUploadComponent implements ControlValueAccessor {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() label?: string;
  @Input() placeholder = 'Upload Image';
  @Input() hint?: string;
  @Input() accept = 'image/*';
  @Input() maxSize = 5; // In MB
  @Input() id = `image-upload-${Math.random().toString(36).substring(2, 9)}`;
  
  @Output() imageSelected = new EventEmitter<File>();

  control = new FormControl();
  isDragging = false;
  previewUrl: string | null = null;
  fileName: string | null = null;
  fileSize: number = 0;

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.handleFile(input.files[0]);
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
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.previewUrl = null;
    this.fileName = null;
    this.fileSize = 0;
    this.control.setValue(null);
    this.onChange(null);
    
    // Reset file input
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  handleFile(file: File): void {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.control.setErrors({ ...this.control.errors, fileType: true });
      return;
    }

    // Validate file size
    if (file.size > this.maxSize * 1024 * 1024) {
      this.control.setErrors({ ...this.control.errors, fileSize: true });
      return;
    }

    // Store file info
    this.fileName = file.name;
    this.fileSize = file.size;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.control.setValue(file);
      this.onChange(file);
      this.imageSelected.emit(file);
    };
    reader.readAsDataURL(file);
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
    if (value instanceof File) {
      this.handleFile(value);
    } else if (typeof value === 'string' && value) {
      // Handle URLs (from database)
      this.previewUrl = value;
      this.control.setValue(value);
    } else {
      this.previewUrl = null;
      this.fileName = null;
      this.fileSize = 0;
      this.control.setValue(null);
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