import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RestServerError } from 'projects/commons/src/lib/config/entities/rest-server-error';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { throwError } from 'rxjs';
import { ErrorInterceptor } from './error-interceptor.service';
import Spy = jasmine.Spy;

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let next: HttpHandler;
  let eventBus: EventBusService;

  beforeEach(() => {
    eventBus = eventBusSpy();

    TestBed.configureTestingModule({
      providers: [{ provide: ErrorInterceptor, useValue: new ErrorInterceptor(eventBus) }],
    });
    interceptor = TestBed.inject(ErrorInterceptor);
    next = jasmine.createSpyObj('next', ['handle']);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept', () => {
    (next.handle as Spy).and.returnValue(
      throwError(
        new HttpErrorResponse({
          status: 404,
          error: JSON.stringify({ type: 'ItemNotFound', message: 'message' }),
        }),
      ),
    );
    const req = new HttpRequest('GET', 'apiUrl/path');

    interceptor.intercept(req, next).subscribe(
      () => fail('should return error'),
      // eslint-disable-next-line jasmine/new-line-before-expect
      (error) => expect(error).toEqual(new RestServerError('Error 404', 'message')),
    );

    expect(next.handle).toHaveBeenCalledWith(req);
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(eventBus.publish).toHaveBeenCalled();
  });
});
