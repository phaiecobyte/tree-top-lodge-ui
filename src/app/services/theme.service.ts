import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeLinkElement: HTMLLinkElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.themeLinkElement = document.createElement('link');
      this.themeLinkElement.rel = 'stylesheet';
      this.themeLinkElement.id = 'theme-stylesheet';
      document.head.appendChild(this.themeLinkElement);
    }
  }

  setTheme(themeName: string): void {
    if (this.themeLinkElement) {
      this.themeLinkElement.href = `./themes/${themeName}/bootstrap.min.css`;
    }
  }
}