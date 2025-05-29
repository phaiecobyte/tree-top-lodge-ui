import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <select 
        [id]="id"
        [formControl]="control"
        class="form-select"
        [ngClass]="{'is-invalid': control.invalid && (control.touched || control.dirty)}"
        [attr.aria-describedby]="hint ? id + '-hint' : null"
      >
        <option *ngIf="placeholder" value="" disabled>{{ placeholder }}</option>
        <option *ngFor="let option of options" [value]="option.value" [disabled]="option.disabled">
          {{ option.label }}
        </option>
      </select>
      <div *ngIf="control.invalid && (control.touched || control.dirty)" class="invalid-feedback">
        <div *ngIf="control.errors?.['required']">{{ label || 'This field' }} is required</div>
        <ng-content select="[error]"></ng-content>
      </div>
      <small *ngIf="hint" class="form-text text-muted" [id]="id + '-hint'">{{ hint }}</small>
    </div>
  `
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() options: SelectOption[] = [];
  @Input() hint?: string;
  @Input() id = `select-${Math.random().toString(36).substring(2, 9)}`;

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