import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestServerError } from 'projects/commons/src/lib/config/entities/rest-server-error';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { ErrorNotification } from 'projects/commons/src/lib/notification/entities/error-notification';
import { NotificationEvent } from 'projects/commons/src/lib/notification/entities/notification-event';
import { NotificationLevel } from 'projects/commons/src/lib/notification/entities/notification-level';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public static readonly DISABLE_NOTIFICATION_HEADER = 'Vg-Disable-Notification';

  constructor(private eventBus: EventBusService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError<any, any>((error) => {
        const restError = RestServerError.fromError(error);
        if (!request.headers.get(ErrorInterceptor.DISABLE_NOTIFICATION_HEADER)) {
          this.eventBus.publish(
            new NotificationEvent(
              new ErrorNotification(
                `${restError.title}: ${restError.message}`,
                NotificationLevel.ERROR,
                restError.trace,
              ),
            ),
          );
        }
        return throwError(restError);
      }),
    );
  }
}
