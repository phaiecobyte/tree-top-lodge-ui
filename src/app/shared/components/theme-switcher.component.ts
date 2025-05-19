import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  template: `
    <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="themeDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
    <i class="bi bi-moon-stars-fill"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="themeDropdown">
      <li *ngFor="let theme of themes">
        <button class="dropdown-item" (click)="changeTheme(theme)">
          {{ theme }}
        </button>
      </li>
    </ul>
  </div>
  `
})
export class ThemeSwitcherComponent {
  themes = ['darkly','flatly','quartz','lux'];

  constructor(private themeService:ThemeService){}

  changeTheme(theme:string){
    this.themeService.setTheme(theme);
  }
}
