import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    importProvidersFrom([
      provideFirebaseApp(() => firebaseApp),
      provideFirestore(() => getFirestore(firebaseApp)),
      provideStorage(() => getStorage(firebaseApp)),
      provideAuth(() => getAuth(firebaseApp))
    ])
  ]
};
