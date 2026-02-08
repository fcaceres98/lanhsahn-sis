import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpHeaderInterceptor } from '@src/app/core/interceptors/http-header-interceptor';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideAnimationsAsync(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([httpHeaderInterceptor])
        ),
        importProvidersFrom(
            BrowserAnimationsModule,
            SimpleNotificationsModule.forRoot()
        )
    ]
};
