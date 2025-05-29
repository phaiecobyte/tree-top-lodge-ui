import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Feature {
  icon?: string;
  text: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul 
      class="list-group" 
      [ngClass]="{'list-group-flush': flush, 'small': compact}" 
      [class]="containerClass"
    >
      <li 
        *ngFor="let feature of features" 
        class="list-group-item" 
        [class.text-primary]="feature.highlighted"
      >
        <i *ngIf="feature.icon" class="bi {{ feature.icon }} me-2" 
           [class.text-success]="!feature.highlighted"></i>
        <i *ngIf="!feature.icon && checkIcon" class="bi {{ checkIcon }} me-2 text-success"></i>
        {{ feature.text }}
      </li>
    </ul>
  `
})
export class FeatureListComponent {
  @Input() features: Feature[] = [];
  @Input() flush = true;
  @Input() compact = true;
  @Input() checkIcon = 'bi-check-circle-fill';
  @Input() containerClass = 'mb-3';
}