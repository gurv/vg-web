import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ConfigurationService,
  loadConfiguration,
} from './services/configuration/configuration.service';
import { ErrorInterceptor } from './services/error-interceptor/error-interceptor.service';
import { EventModule } from 'projects/commons/src/lib/event/event.module';
import { ENVIRONMENT } from './entities/configuration-environment';
import { ApplicationIdHeaderInterceptor } from './services/application-id-header-interceptor/application-id-header-interceptor.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, EventModule],
  exports: [HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApplicationIdHeaderInterceptor, multi: true },
  ],
})
export class ConfigurationModule {
  public static forRoot(environment: any): ModuleWithProviders<ConfigurationModule> {
    return {
      ngModule: ConfigurationModule,
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: environment,
        },
      ],
    };
  }
}
