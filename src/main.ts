// Framework-Modules
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Third-Party-Modules
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Project-Modules
import { App } from './app/app';
import { routes } from './app/app.routes';

// Factory function for the TranslateLoader
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  // Loads translation files from the assets/i18n/ directory
  return new TranslateHttpLoader();
}

// Bootstrap the Angular application
bootstrapApplication(App, {
  providers: [
    // Provide application routes
    provideRouter(routes),

    // Provide HTTP client with interceptors
    provideHttpClient(withInterceptorsFromDi()),

    // Import and configure TranslateModule
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
  ],
})
  .then((appRef) => {
    // Set the initial language to English
    const translate = appRef.injector.get(TranslateService);
    translate.use('en');
  })
  .catch((err) => console.error(err));
