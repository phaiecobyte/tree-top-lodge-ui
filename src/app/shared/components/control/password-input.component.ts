import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <div class="input-group">
        <input 
          [type]="showPassword ? 'text' : 'password'"
          [id]="id"
          [formControl]="control"
          class="form-control"
          [placeholder]="placeholder"
          [ngClass]="{'is-invalid': control.invalid && (control.touched || control.dirty)}"
        >
        <button 
          class="btn btn-outline-secondary" 
          type="button"
          (click)="toggleShowPassword()"
          [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
        >
          <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
        </button>
        <div *ngIf="control.invalid && (control.touched || control.dirty)" class="invalid-feedback">
          <div *ngIf="control.errors?.['required']">{{ label || 'Password' }} is required</div>
          <div *ngIf="control.errors?.['minlength']">
            {{ label || 'Password' }} must be at least {{ control.errors?.['minlength']?.requiredLength }} characters
          </div>
          <ng-content select="[error]"></ng-content>
        </div>
      </div>
      <small *ngIf="hint" class="form-text text-muted">{{ hint }}</small>
    </div>
  `
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() label = 'Password';
  @Input() placeholder = '';
  @Input() hint?: string;
  @Input() id = `password-${Math.random().toString(36).substring(2, 9)}`;
  
  showPassword = false;
  control = new FormControl();

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  private onTouched = () => {};
}