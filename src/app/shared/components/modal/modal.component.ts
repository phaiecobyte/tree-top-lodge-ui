import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal fade" tabindex="-1" #modalElement
         [attr.data-bs-backdrop]="staticBackdrop ? 'static' : true"
         [attr.data-bs-keyboard]="!staticBackdrop">
      <div class="modal-dialog" [ngClass]="dialogClasses">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header" *ngIf="!hideHeader">
            <h5 class="modal-title">
              <ng-container *ngIf="!headerTemplate">{{ title }}</ng-container>
              <ng-container *ngTemplateOutlet="headerTemplate || null"></ng-container>
            </h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="hide()"></button>
          </div>
          
          <!-- Body -->
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          
          <!-- Footer -->
          <div class="modal-footer" *ngIf="!hideFooter">
            <ng-container *ngIf="!footerTemplate">
              <button 
                *ngIf="showCancelButton" 
                type="button" 
                class="btn" 
                [ngClass]="cancelButtonClass" 
                (click)="onCancel()"
              >
                {{ cancelButtonText }}
              </button>
              <button 
                *ngIf="showConfirmButton" 
                type="button" 
                class="btn" 
                [ngClass]="confirmButtonClass"
                [disabled]="disableConfirm || loading"
                (click)="onConfirm()"
              >
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ confirmButtonText }}
              </button>
            </ng-container>
            <ng-container *ngTemplateOutlet="footerTemplate || null"></ng-container>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modalElement') modalElement!: ElementRef;
  @ContentChild('modalHeader') headerTemplate?: TemplateRef<any>;
  @ContentChild('modalFooter') footerTemplate?: TemplateRef<any>;

  @Input() title: string = 'Modal Title';
  @Input() size: 'sm' | 'lg' | 'xl' | '' = '';
  @Input() centered: boolean = false;
  @Input() scrollable: boolean = false;
  @Input() fullscreen: boolean | string = false;
  @Input() staticBackdrop: boolean = false;
  @Input() hideHeader: boolean = false;
  @Input() hideFooter: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;
  @Input() cancelButtonText: string = 'Cancel';
  @Input() confirmButtonText: string = 'Confirm';
  @Input() cancelButtonClass: string = 'btn-secondary';
  @Input() confirmButtonClass: string = 'btn-primary';
  @Input() disableConfirm: boolean = false;
  @Input() loading: boolean = false;

  @Output() shown = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private modalInstance: any;

  get dialogClasses(): string {
    const classes = [];
    
    if (this.size) {
      classes.push(`modal-${this.size}`);
    }
    
    if (this.centered) {
      classes.push('modal-dialog-centered');
    }
    
    if (this.scrollable) {
      classes.push('modal-dialog-scrollable');
    }
    
    if (this.fullscreen === true) {
      classes.push('modal-fullscreen');
    } else if (typeof this.fullscreen === 'string' && this.fullscreen) {
      classes.push(`modal-fullscreen-${this.fullscreen}`);
    }
    
    return classes.join(' ');
  }

  ngAfterViewInit(): void {
    this.initModal();
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  private initModal(): void {
    const modalElement = this.modalElement.nativeElement;
    this.modalInstance = new bootstrap.Modal(modalElement);
    
    modalElement.addEventListener('shown.bs.modal', () => {
      this.shown.emit();
    });
    
    modalElement.addEventListener('hidden.bs.modal', () => {
      this.hidden.emit();
    });
  }

  /**
   * Show the modal
   */
  show(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * Hide the modal
   */
  hide(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * Destroy the modal
   */
  dispose(): void {
    if (this.modalInstance) {
      this.modalInstance.dispose();
    }
  }

  /**
   * Handle confirm button click
   */
  onConfirm(): void {
    this.confirm.emit();
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.cancel.emit();
    this.hide();
  }
}