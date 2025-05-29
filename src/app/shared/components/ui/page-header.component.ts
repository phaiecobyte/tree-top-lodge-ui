import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header mb-4">
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h1 class="h2 mb-1">{{ title }}</h1>
          <p *ngIf="subtitle" class="text-muted mb-0">{{ subtitle }}</p>
        </div>
        <div class="d-flex align-items-center mt-2 mt-md-0">
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>
      <hr *ngIf="showDivider" class="my-3">
    </div>
  `,
  styles: [`
    .page-header {
      padding-top: 1rem;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() showDivider = true;
}