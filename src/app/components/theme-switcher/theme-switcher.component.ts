import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  themes = ['darkly', 'flatly'];

  constructor(private themeService:ThemeService){}

  changeTheme(theme:string){
    this.themeService.setTheme(theme);
  }
}
