import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { newTestTab } from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component.spec';
import { TabSelectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-selected-event';
import { TabUnselectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-unselected-event';
import { TabsService } from './tabs.service';

// eslint-disable-next-line jasmine/no-unsafe-spy
export const tabsServiceSpy = () => jasmine.createSpyObj('TabsService', ['isSelected']);

@Component({
  selector: 'lib-test',
  template: 'test',
})
class TestComponent { }

describe('TabsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabsService, EventBusService],
      declarations: [TestComponent],
    });
  });

  it('should be created', inject([TabsService], (service: TabsService) => {
    expect(service).toBeTruthy();
    service.ngOnDestroy();
  }));

  it('should (un)select tab', inject(
    [TabsService, EventBusService],
    (service: TabsService, eventBus: EventBusService) => {
      const tab = newTestTab(TestComponent);
      eventBus.publish(new TabSelectedEvent(tab));

      expect(service.isSelected({ label: tab.label })).toBe(true);
      expect(service.isSelected({ label: 'someothershit' })).toBe(false);

      eventBus.publish(new TabUnselectedEvent(tab));

      expect(service.isSelected({ label: tab.label })).toBe(false);
    },
  ));
});
