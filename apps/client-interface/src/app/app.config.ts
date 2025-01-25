import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthStateService } from './state/auth-state.service';
import { AuthenticationService } from './authentication.service';
import { httpInterceptor } from './http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes), provideAnimationsAsync(),
    provideHttpClient(),
    AuthStateService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useValue: httpInterceptor,
      multi: true
    }
  ],
};
