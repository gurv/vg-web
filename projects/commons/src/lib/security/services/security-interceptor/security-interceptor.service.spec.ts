import { HttpHandler, HttpRequest } from '@angular/common/http';
import { SecurityInterceptor } from '../security-interceptor/security-interceptor.service';
import { SecurityService } from '../security/security.service';
import { securityServiceSpy } from '../security/security.service.spec';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;

describe('SecurityInterceptor', () => {
  let interceptor: SecurityInterceptor;
  let next: SpyObj<HttpHandler>;
  let service: SpyObj<SecurityService>;

  beforeEach(() => {
    service = securityServiceSpy();
    interceptor = new SecurityInterceptor(service);
    next = jasmine.createSpyObj('next', ['handle']);
    next.handle.and.returnValue(of(null));
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept', () => {
    (service as any).authenticated = true;
    (service as any).token = of('token');
    const req = new HttpRequest('GET', 'apiUrl/path');
    const intercepted = req.clone({
      headers: req.headers.set('Authorization', 'Bearer token'),
    });
    interceptor.intercept(req, next).subscribe();

    expect(next.handle).toHaveBeenCalledWith(intercepted);
  });

  it('should not intercept', () => {
    (service as any).authenticated = false;
    (service as any).token = of('token');
    const req = new HttpRequest('GET', 'apiUrl/path');
    interceptor.intercept(req, next);

    expect(next.handle).toHaveBeenCalledWith(req);
  });
});
