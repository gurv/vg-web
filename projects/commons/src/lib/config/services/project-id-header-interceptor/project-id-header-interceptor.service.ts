import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import * as _ from 'lodash';

@Injectable()
export class ProjectIdHeaderInterceptor implements HttpInterceptor {
  constructor(private configuration: ConfigurationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      _.includes(request.url, this.configuration.backendApiUrl) &&
      !!this.configuration.projectId
    ) {
      const withProject = request.clone({
        headers: request.headers.set('ProjectId', this.configuration.projectId),
      });
      return next.handle(withProject);
    }
    return next.handle(request);
  }
}
