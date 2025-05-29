import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type"
      class="btn d-flex justify-content-center align-items-center"
      [ngClass]="buttonClasses"
      [disabled]="disabled || loading"
      (click)="onClick()"
    >
      <span *ngIf="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      <ng-content *ngIf="!loading"></ng-content>
      <span *ngIf="loading">{{ loadingText }}</span>
    </button>
  `
})
export class LoadingButtonComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() outline = false;
  @Input() block = false;
  @Input() size: 'sm' | 'lg' | '' = '';
  @Input() loadingText = 'Loading...';
  
  @Output() buttonClick = new EventEmitter<void>();

  get buttonClasses(): string {
    const classes = [
      this.outline ? `btn-outline-${this.color}` : `btn-${this.color}`,
      this.size ? `btn-${this.size}` : ''
    ];
    
    if (this.block) {
      classes.push('w-100');
    }
    
    return classes.join(' ');
  }

  onClick(): void {
    if (!this.loading && !this.disabled) {
      this.buttonClick.emit();
    }
  }
}