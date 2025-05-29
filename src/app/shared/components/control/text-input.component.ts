import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <input 
        [type]="type"
        [id]="id"
        [formControl]="control"
        class="form-control"
        [placeholder]="placeholder"
        [ngClass]="{'is-invalid': control.invalid && (control.touched || control.dirty)}"
      >
      <div *ngIf="control.invalid && (control.touched || control.dirty)" class="invalid-feedback">
        <div *ngIf="control.errors?.['required']">{{ label || 'This field' }} is required</div>
        <div *ngIf="control.errors?.['email']">Please enter a valid email address</div>
        <div *ngIf="control.errors?.['minlength']">
          {{ label || 'This field' }} must be at least {{ control.errors?.['minlength']?.requiredLength }} characters
        </div>
        <div *ngIf="control.errors?.['maxlength']">
          {{ label || 'This field' }} cannot exceed {{ control.errors?.['maxlength']?.requiredLength }} characters
        </div>
        <div *ngIf="control.errors?.['pattern']">{{ label || 'This field' }} has an invalid format</div>
        <ng-content select="[error]"></ng-content>
      </div>
      <small *ngIf="hint" class="form-text text-muted">{{ hint }}</small>
    </div>
  `
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type: 'text' | 'email' | 'number' | 'file' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() hint?: string;
  @Input() id = `input-${Math.random().toString(36).substring(2, 9)}`;

  control = new FormControl();

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
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