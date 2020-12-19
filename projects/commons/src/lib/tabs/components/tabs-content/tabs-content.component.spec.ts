import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';
import { TabSelectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-selected-event';
import { TabUnselectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-unselected-event';
import { LocalStorageService } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service';
import { localStorageServiceSpy } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service.spec';
import { newTestTab } from '../tab-header/tab-header.component.spec';
import { TabsContentComponent } from './tabs-content.component';
import { TabsContentModule } from './tabs-content.module';

import Spy = jasmine.Spy;

@Component({
  selector: 'lib-test',
  template: 'test',
})
class TestComponent { }

class TestEvent extends BusEvent {
  constructor() {
    super('test');
  }
}

describe('TabsContentComponent', () => {
  let component: TabsContentComponent;
  let fixture: ComponentFixture<TabsContentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreTestModule, TabsContentModule],
        providers: [{ provide: LocalStorageService, useValue: localStorageServiceSpy() }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsContentComponent);
    component = fixture.componentInstance;
    component.id = 'test';
    component.tabs = [newTestTab(TestComponent)];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire _selection event on creation', inject(
    [EventBusService],
    (eventBus: EventBusService) => {
      const publish = spyOn(eventBus, 'publish');
      component.defaultTabIndex = 0;
      component.ngOnInit();

      expect(publish).toHaveBeenCalledWith(new TabSelectedEvent(component.selectedTab));
    },
  ));

  it('should selectOn', inject([EventBusService], (service: EventBusService) => {
    component.selectedTab = null;
    const spy = spyOn(component, 'selectTab');
    service.publish(new TestEvent());

    expect(spy).toHaveBeenCalledWith(0);
  }));

  it('should not selectOn', inject([EventBusService], (service: EventBusService) => {
    component.selectedTab = component.tabs[0];
    const spy = spyOn(component, 'selectTab');
    service.publish(new TestEvent());

    expect(spy).not.toHaveBeenCalled();
  }));

  it('should load conf from storage', inject(
    [LocalStorageService],
    (storage: LocalStorageService) => {
      (storage.getNumber as Spy).and.returnValue(0);
      component.ngOnInit();

      expect(component.selectedTab).toBe(component.tabs[0]);
    },
  ));

  it('should load default conf', inject([LocalStorageService], (storage: LocalStorageService) => {
    (storage.getNumber as Spy).and.returnValue(-1);
    component.ngOnInit();

    expect(component.selectedTab).toBeUndefined();
  }));

  it('should selectTab', inject(
    [LocalStorageService, EventBusService],
    (storage: LocalStorageService, eventBus: EventBusService) => {
      const publish = spyOn(eventBus, 'publish');
      const emit = spyOn(component.tabSelected, 'emit');
      component.selectTab(0);

      expect(component.selectedTab).toBe(component.tabs[0]);
      expect(storage.set).toHaveBeenCalledWith(component.id, 0);
      expect(emit).toHaveBeenCalledWith([0, component.tabs[0]]);
      expect(publish).toHaveBeenCalledWith(new TabSelectedEvent(component.selectedTab));
      expect(publish).toHaveBeenCalledWith(new SelectHelpEvent('TEST'));
    },
  ));

  it('should other selectTab', inject(
    [LocalStorageService, EventBusService],
    (storage: LocalStorageService, eventBus: EventBusService) => {
      const publish = spyOn(eventBus, 'publish');
      const emit = spyOn(component.tabSelected, 'emit');
      const otherTab = newTestTab(TestComponent);
      component.selectedTab = otherTab;
      component.selectTab(0);

      expect(component.selectedTab).toBe(component.tabs[0]);
      expect(storage.set).toHaveBeenCalledWith(component.id, 0);
      expect(emit).toHaveBeenCalledWith([0, component.tabs[0]]);
      expect(publish).toHaveBeenCalledWith(new TabSelectedEvent(component.tabs[0]));
      expect(publish).toHaveBeenCalledWith(new TabUnselectedEvent(otherTab));
    },
  ));

  it('should unselectTab', inject(
    [LocalStorageService, EventBusService],
    (storage: LocalStorageService, eventBus: EventBusService) => {
      const publish = spyOn(eventBus, 'publish');
      const tab = (component.selectedTab = component.tabs[0]);
      const emit = spyOn(component.tabUnselected, 'emit');
      component.unselectTab();

      expect(component.selectedTab).toBeNull();
      expect(storage.set).toHaveBeenCalledWith(component.id, -1);
      expect(emit).toHaveBeenCalledWith();
      expect(publish).toHaveBeenCalledWith(new TabUnselectedEvent(tab));
    },
  ));

  it('should unselectTab do nothing', inject(
    [LocalStorageService],
    (storage: LocalStorageService) => {
      component.selectedTab = null;
      const emit = spyOn(component.tabUnselected, 'emit');
      component.unselectTab();

      expect(emit).not.toHaveBeenCalled();
    },
  ));
});
