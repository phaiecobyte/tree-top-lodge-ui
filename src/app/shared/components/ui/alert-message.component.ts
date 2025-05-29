import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="message" 
      class="alert alert-{{ type }} alert-dismissible fade show" 
      role="alert"
      [ngClass]="{'mb-4': marginBottom}"
    >
      <div class="d-flex align-items-center">
        <i *ngIf="showIcon" class="bi me-2" [ngClass]="iconClass"></i>
        <div>
          <strong *ngIf="title">{{ title }}:</strong>
          <span>{{ message }}</span>
        </div>
      </div>
      <button 
        *ngIf="dismissible" 
        type="button" 
        class="btn-close" 
        aria-label="Close" 
        (click)="dismiss()"
      ></button>
    </div>
  `
})
export class AlertMessageComponent {
  @Input() type: AlertType = 'info';
  @Input() message: string | null = null;
  @Input() title?: string;
  @Input() dismissible = true;
  @Input() showIcon = true;
  @Input() marginBottom = true;
  
  @Output() closed = new EventEmitter<void>();

  get iconClass(): string {
    const icons = {
      'success': 'bi-check-circle-fill',
      'danger': 'bi-exclamation-triangle-fill',
      'warning': 'bi-exclamation-circle-fill',
      'info': 'bi-info-circle-fill'
    };
    return icons[this.type];
  }

  dismiss(): void {
    this.message = null;
    this.closed.emit();
  }
}