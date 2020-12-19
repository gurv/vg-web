import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageNodeTabHeaderComponent } from './storage-node-tab-header.component';
import { StorageNodeTabHeaderModule } from './storage-node-tab-header.module';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { CloseTabsEvent } from 'projects/commons/src/lib/tabs/entities/close-tabs-event';

describe('StorageNodeTabHeaderComponent', () => {
  let component: StorageNodeTabHeaderComponent;
  let fixture: ComponentFixture<StorageNodeTabHeaderComponent>;
  let eventBus: EventBusService;

  beforeEach(
    waitForAsync(() => {
      eventBus = eventBusSpy();
      TestBed.configureTestingModule({
        imports: [StorageNodeTabHeaderModule],
        providers: [{ provide: EventBusService, useValue: eventBus }],
      })
        .overrideTemplate(StorageNodeTabHeaderComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageNodeTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand', () => {
    component.expand();

    expect(eventBus.publish).toHaveBeenCalledWith(new CloseTabsEvent());
  });
});
