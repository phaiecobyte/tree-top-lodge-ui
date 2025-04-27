import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeService } from './app/services/theme.service';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const themeService = appRef.injector.get(ThemeService);
    themeService.setTheme('flatly'); // Set default theme
  })
  .catch((err) => console.error(err));
