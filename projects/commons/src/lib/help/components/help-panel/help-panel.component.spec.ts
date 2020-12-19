import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';
import { SplitPanesDragStart } from 'projects/commons/src/lib/split/entities/split-panes-drag-start';
import { SplitPanesDragStop } from 'projects/commons/src/lib/split/entities/split-panes-drag-stop';
import { HelpPanelComponent } from './help-panel.component';
import { HelpPanelModule } from './help-panel.module';

describe('HelpPanelComponent', () => {
  let component: HelpPanelComponent;
  let fixture: ComponentFixture<HelpPanelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreTestModule, HelpPanelModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('iframe').getAttribute('src')).toBe('docUrl/');
  });

  it('should deactivate mouse event while a split pane is dragged', inject(
    [EventBusService],
    (eventBus: EventBusService) => {
      // https://stackoverflow.com/questions/5645485/detect-mousemove-when-over-an-iframe
      expect(component.pointerEvents).toBe('auto');

      eventBus.publish(new SplitPanesDragStart());

      expect(component.pointerEvents).toBe('none');

      eventBus.publish(new SplitPanesDragStop());

      expect(component.pointerEvents).toBe('auto');
    },
  ));

  it('should open help pageId', inject([EventBusService], (eventBus: EventBusService) => {
    eventBus.publish(new OpenHelpEvent('TEST'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('iframe').getAttribute('src')).toBe('docUrl/test');
  }));
});
