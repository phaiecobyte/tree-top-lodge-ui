import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeService } from './app/core/services/theme.service'; // Fix the import path

bootstrapApplication(AppComponent, appConfig)
  .then(ref => {
    // Set default theme after app initialization
    const themeService = ref.injector.get(ThemeService);
    themeService.setTheme('flatly');
  })
  .catch((err) => console.error(err));
