import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventModule } from 'projects/commons/src/lib/event/event.module';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { TabsAddedEvent } from 'projects/commons/src/lib/tabs/entities/tabs-added-event';
import { TabsPosition } from 'projects/commons/src/lib/tabs/entities/tabs-position';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { FullPageComponent } from './full-page.component';
import { FullPageModule } from './full-page.module';

@Component({
  selector: 'lib-test',
  template: `
    <lib-full-page>
      <div class="menu" full-page-menu>Menu</div>
      <div class="content" full-page-content>Content</div>
    </lib-full-page>
  `,
})
class TestComponent {
  @ViewChild(FullPageComponent, { static: true }) fullPage: FullPageComponent;
}

describe('FullPageComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FullPageModule, EventModule],
        declarations: [TestComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display menu and content', () => {
    expect(fixture.debugElement.query(By.css('[full-page-menu]')).nativeElement.innerHTML).toBe(
      'Menu',
    );

    expect(fixture.debugElement.query(By.css('[full-page-content]')).nativeElement.innerHTML).toBe(
      'Content',
    );
  });

  it('should leave place for tabs', fakeAsync(() => {
    const eventBus = TestBed.inject(EventBusService);
    eventBus.publish(new TabsAddedEvent(TabsSide.BOTTOM, TabsPosition.START));
    eventBus.publish(new TabsAddedEvent(TabsSide.LEFT, TabsPosition.START));
    eventBus.publish(new TabsAddedEvent(TabsSide.TOP, TabsPosition.START));
    eventBus.publish(new TabsAddedEvent(TabsSide.RIGHT, TabsPosition.START));
    tick(100);
    fixture.detectChanges();

    expect(component.fullPage.tabsRight).toBe(true);
    expect(component.fullPage.tabsLeft).toBe(true);
    expect(component.fullPage.tabsBottom).toBe(true);
    expect(component.fullPage.tabsTop).toBe(true);
  }));
});
