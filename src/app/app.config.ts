import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  apiLoadingInterceptor,
  apiResponseInterceptor,
  cookieInterceptor,
} from '@core/interceptors';
import { AppErrorService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        cookieInterceptor,
        apiLoadingInterceptor,
        apiResponseInterceptor,
      ])
    ),
    provideAnimations(),
    DialogService,
    MessageService,
    {
      provide: ErrorHandler,
      useClass: AppErrorService,
    },
  ],
};
