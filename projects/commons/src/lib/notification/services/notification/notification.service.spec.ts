import { inject, TestBed } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HighlightService } from 'projects/commons/src/lib/help/services/highlight/highlight.service';
import { highlightServiceSpy } from 'projects/commons/src/lib/help/services/highlight/highlight.service.spec';
import { testNotification } from 'projects/commons/src/lib/notification/entities/base-notification.spec';
import { NotificationEvent } from 'projects/commons/src/lib/notification/entities/notification-event';
import { OpenNotificationsEvent } from 'projects/commons/src/lib/notification/entities/open-notifications-event';
import { NotificationService } from 'projects/commons/src/lib/notification/services/notification/notification.service';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { tabsServiceSpy } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service.spec';
import { NotificationModule } from '../../notification.module';
import Spy = jasmine.Spy;

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule, NotificationModule],
      providers: [
        NotificationService,
        { provide: TabsService, useValue: tabsServiceSpy() },
        { provide: HighlightService, useValue: highlightServiceSpy() },
      ],
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should count', inject([NotificationService], (service: NotificationService) => {
    TestBed.inject(EventBusService).publish(new NotificationEvent(testNotification()));
    const count = service.count;

    expect(count).toBe(1);
    expect(service.notifications.length).toBe(1);
    expect(service.notificationsSubject.getValue()).toBe(service.notifications);
  }));

  it('should be destroyed', inject([NotificationService], (service: NotificationService) => {
    service.ngOnDestroy();

    // eslint-disable-next-line jasmine/expect-single-argument
    expect().nothing();
  }));

  it('should publish event on snackbar action', inject(
    [NotificationService, EventBusService, TabsService],
    (service: NotificationService, eventBus: EventBusService, tabsService: TabsService) => {
      (tabsService.isSelected as Spy).and.returnValue(false);
      spyOn(eventBus, 'publish');
      service._snackbarAction();

      expect(eventBus.publish).toHaveBeenCalledWith(new OpenNotificationsEvent());
    },
  ));

  it('should publish event on snackbar action (2)', inject(
    [NotificationService, EventBusService, TabsService, HighlightService],
    (
      service: NotificationService,
      eventBus: EventBusService,
      tabsService: TabsService,
      highlight: HighlightService,
    ) => {
      (tabsService.isSelected as Spy).and.returnValue(true);
      spyOn(eventBus, 'publish');
      service._snackbarAction();

      expect(highlight.highlight).toHaveBeenCalledWith('lib-notification-table');
    },
  ));

  it('should clear', inject([NotificationService], (service: NotificationService) => {
    service.clear();

    expect(service.notifications).toEqual([]);
  }));
});
