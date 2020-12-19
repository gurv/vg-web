import { inject, TestBed } from '@angular/core/testing';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';
import { BehaviorSubject } from 'rxjs';
import { HelpService } from './help.service';

export const helpServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('HelpService', ['']);
  spy.lastPage = new BehaviorSubject<HelpPageId>('HOME');
  return spy;
};

describe('HelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpService, EventBusService],
    });
  });

  it('should be created', inject([HelpService], (service: HelpService) => {
    expect(service).toBeTruthy();
    expect(service.lastPage.getValue()).toBe('HOME');
    service.ngOnDestroy();
  }));

  it('should store last pageId', inject(
    [HelpService, EventBusService],
    (service: HelpService, eventBus: EventBusService) => {
      eventBus.publish(new OpenHelpEvent('TEST'));

      expect(service.lastPage.getValue()).toBe('TEST');

      eventBus.publish(new SelectHelpEvent('HOME'));

      expect(service.lastPage.getValue()).toBe('HOME');
    },
  ));
});
