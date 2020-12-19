import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor(private security: SecurityService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.security.authenticated) {
      return this.security.token.pipe(
        mergeMap((token) => {
          const withAuth = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
          return next.handle(withAuth);
        }),
      );
    }
    return next.handle(request);
  }
}
