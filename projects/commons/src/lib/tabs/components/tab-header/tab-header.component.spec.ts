import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { TabSelectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-selected-event';
import { TabUnselectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-unselected-event';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { tabsServiceSpy } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service.spec';
import {
  SIDE_HEADER_DATA,
  TabHeaderComponent,
  TAB_HEADER_DATA
} from '../tab-header/tab-header.component';
import { TabHeaderModule } from './tab-header.module';
import Spy = jasmine.Spy;

library.add(faQuestionCircle);

export const newTestTab = (component: ComponentType<any>) =>
  new Tab(
    new ComponentPortal(component),
    'TestStart',
    new IconFa(faQuestionCircle),
    'TEST',
    false,
    ['test'],
  );

@Component({
  selector: 'lib-test',
  template: 'test',
})
class TestComponent { }

describe('TabHeaderComponent', () => {
  let component: TabHeaderComponent;
  let fixture: ComponentFixture<TabHeaderComponent>;
  let testTab: Tab;

  beforeEach(
    waitForAsync(() => {
      testTab = newTestTab(TestComponent);

      TestBed.configureTestingModule({
        imports: [TabHeaderModule],
        providers: [
          { provide: TAB_HEADER_DATA, useValue: testTab },
          { provide: SIDE_HEADER_DATA, useValue: TabsSide.LEFT },
          { provide: TabsService, useValue: tabsServiceSpy() },
        ],
      }).compileComponents();
    }),
  );

  it('should create and select tab', inject([TabsService], (tabsService: TabsService) => {
    (tabsService.isSelected as Spy).and.returnValue(true);
    fixture = TestBed.createComponent(TabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.state).toBe('selected');
  }));

  it('should create and not select tab', inject(
    [EventBusService, TabsService],
    (eventBus: EventBusService, tabsService: TabsService) => {
      (tabsService.isSelected as Spy).and.returnValue(false);
      fixture = TestBed.createComponent(TabHeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(component.state).toBe('');

      eventBus.publish(new TabSelectedEvent(testTab));

      expect(component.state).toBe('selected');

      eventBus.publish(new TabUnselectedEvent(testTab));

      expect(component.state).toBe('');
    },
  ));
});
