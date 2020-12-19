import { HttpTestingController } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { configurationServiceMock } from 'projects/commons/src/lib/config/services/configuration/configuration.service.spec';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { DurationToStringPipe } from 'projects/commons/src/lib/date/pipes/duration-to-string/duration-to-string.pipe';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { NotificationEvent } from 'projects/commons/src/lib/notification/entities/notification-event';
import { Log } from 'projects/commons/src/lib/runtime/entities/log';
import { testLog } from 'projects/commons/src/lib/runtime/entities/log.spec';
import { SecurityService } from 'projects/commons/src/lib/security/services/security/security.service';
import { securityServiceSpy } from 'projects/commons/src/lib/security/services/security/security.service.spec';
import { SSEEvent } from 'projects/commons/src/lib/sse/entities/sse-event';
import { SSEWrapper } from 'projects/commons/src/lib/sse/entities/sse-wrapper';
import { Retry } from 'projects/commons/src/lib/tools/entities/retry';
import { RetriesService } from 'projects/commons/src/lib/tools/services/retries/retries.service';
import { retriesServiceSpy } from 'projects/commons/src/lib/tools/services/retries/retries.service.spec';
import { of } from 'rxjs';
import { EventSourceService } from '../event-source/event-source.service';
import { eventSourceServiceSpy, eventSourceSpy } from '../event-source/event-source.service.spec';
import { SSEConfigurationService } from '../sse-configuration/sse-configuration.service';
import { sseConfigurationServiceSpy } from '../sse-configuration/sse-configuration.service.spec';
import { SSEService } from './sse.service';

import SpyObj = jasmine.SpyObj;

export const sseServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('SSEService', ['watch']);
  spy.reconnected = new EventEmitter<void>();
  return spy;
};

describe('SSEService', () => {
  let service: SSEService;
  let httpTestingController: HttpTestingController;
  let eventBus: EventBusService;
  let eventSource: EventSource;
  let eventSourceService: SpyObj<EventSourceService>;
  let security: SpyObj<SecurityService>;

  beforeEach(() => {
    eventSource = eventSourceSpy();
    eventSourceService = eventSourceServiceSpy();
    security = securityServiceSpy();
    (security as any).token = of('token');
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: EventBusService, useValue: eventBusSpy() },
        { provide: ConfigurationService, useValue: configurationServiceMock() },
        { provide: SSEConfigurationService, useValue: sseConfigurationServiceSpy() },
        { provide: RetriesService, useValue: retriesServiceSpy() },
        { provide: SecurityService, useValue: security },
        { provide: EventSourceService, useValue: eventSourceService },
        SSEService,
        DurationToStringPipe,
      ],
    });
    eventBus = TestBed.inject(EventBusService);
    service = TestBed.inject(SSEService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should watch', () => {
    service.watch();

    expect(service._subscription).toBeTruthy();
    const subscription = (service._subscription = jasmine.createSpyObj('_subscription', [
      'unsubscribe',
    ]));
    service.watch();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should handle error', fakeAsync(() => {
    const watch = spyOn(service, 'watch');
    service.error(null);

    expect(eventBus.publish).toHaveBeenCalledWith(jasmine.any(NotificationEvent));

    tick(1000);

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(watch).toHaveBeenCalled();
  }));

  it('should not handle error destroyed', fakeAsync(() => {
    const watch = spyOn(service, 'watch');
    service.ngOnDestroy();
    service.complete();

    expect(eventBus.publish).toHaveBeenCalledWith(jasmine.any(NotificationEvent));

    tick(1000);

    expect(watch).not.toHaveBeenCalled();
  }));

  it('should send event on LOG message', () => {
    (service._retry as SpyObj<Retry>).isActive.and.returnValue(false);
    const log: Log = testLog();
    const wrapper: SSEWrapper = { type: 'LOG', value: log };
    service.next(wrapper);

    expect(service._retry.reset).not.toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalledWith(new SSEEvent(wrapper));
  });

  it('should send event on LOG message after error', () => {
    (service._retry as SpyObj<Retry>).isActive.and.returnValue(true);
    const log: Log = testLog();
    const wrapper: SSEWrapper = { type: 'LOG', value: log };
    service.next(wrapper);

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(service._retry.reset).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalledWith(new SSEEvent(wrapper));
    expect(eventBus.publish).toHaveBeenCalledWith(jasmine.any(NotificationEvent));
  });
});
