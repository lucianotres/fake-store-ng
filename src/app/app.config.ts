import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LOGGER_TOKEN } from './ILogger';
import { ConsoleLogger } from './services/console-logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), 
    { provide: LOGGER_TOKEN, useClass: ConsoleLogger }
  ]
};
