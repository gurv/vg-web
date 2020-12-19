import { ComponentPortal } from '@angular/cdk/portal';
import { Component, NgModule } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,

  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { TabsContentInitializedEvent } from 'projects/commons/src/lib/tabs/entities/tabs-content-initialized-event';
import { TabsPosition } from 'projects/commons/src/lib/tabs/entities/tabs-position';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { tabsServiceSpy } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service.spec';
import { WindowService } from 'projects/commons/src/lib/tools/services/window/window.service';
import { windowServiceSpy } from 'projects/commons/src/lib/tools/services/window/window.service.spec';
import { newTestTab } from '../tab-header/tab-header.component.spec';
import { TabsContentComponent } from '../tabs-content/tabs-content.component';
import { TabsHeaderComponent } from './tabs-header.component';
import { TabsHeaderModule } from './tabs-header.module';

@Component({
  selector: 'lib-test',
  template: 'test',
})
class TestComponent { }

@NgModule({
  imports: [CoreTestModule, TabsHeaderModule],
  declarations: [TestComponent],
  providers: [{ provide: WindowService, useValue: windowServiceSpy() }],
})
class TestModule { }

describe('TabsHeaderComponent', () => {
  let component: TabsHeaderComponent;
  let fixture: ComponentFixture<TabsHeaderComponent>;
  let eventBus: EventBusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TabsHeaderModule],
        providers: [{ provide: TabsService, useValue: tabsServiceSpy() }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    eventBus = TestBed.inject(EventBusService);
    fixture = TestBed.createComponent(TabsHeaderComponent);
    component = fixture.componentInstance;
    component.tabs = [
      newTestTab(TestComponent),
      new Tab(
        new ComponentPortal(TestComponent),
        'TestStart',
        new IconFa(faQuestionCircle),
        'TEST',
        false,
        ['test'],
        TestComponent,
      ),
    ];
    component.side = TabsSide.TOP;
    component.position = TabsPosition.START;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init content on bus event', fakeAsync(() => {
    const content = new TabsContentComponent(null, eventBus);
    content.headerSide = TabsSide.TOP;
    content.headerPosition = TabsPosition.START;
    eventBus.publish(new TabsContentInitializedEvent(content));
    tick(1);

    expect(component.content).toBe(content);
  }));

  // TODO NullInjectorError: No provider for HttpClient!
  // it('should (un)select', inject(
  //   [LocalStorageService, EventBusService],
  //   (storage: LocalStorageService, bus: EventBusService) => {
  //     const content = new TabsContentComponent(storage, bus);
  //     content.tabs = component.tabs;
  //     component.content = content;
  //     fixture.detectChanges();
  //     fixture.nativeElement.querySelector('button').click();

  //     expect(component.content.selectedTab).toBe(component.tabs[0]);

  //     fixture.nativeElement.querySelector('button').click();

  //     expect(component.content.selectedTab).toBeNull();
  //     expect(TestBed.inject(WindowService).resizeNow).toHaveBeenCalledWith();
  //   },
  // ));
});
