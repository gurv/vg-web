import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { ContextualMenuEvent } from 'projects/storage/src/lib/entities/contextual-menu-event';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { copyPasteServiceSpy } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service.spec';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageContextualMenuComponent } from './storage-contextual-menu.component';

describe('StorageContextualMenuComponent', () => {
  let component: StorageContextualMenuComponent;
  let fixture: ComponentFixture<StorageContextualMenuComponent>;
  let eventBus: EventBusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StorageContextualMenuComponent],
        providers: [
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
          { provide: CopyPasteService, useValue: copyPasteServiceSpy() },
          { provide: STORAGE_ID, useValue: 'storage-id' },
        ],
      })
        .overrideTemplate(StorageContextualMenuComponent, '')
        .compileComponents();
      eventBus = TestBed.inject(EventBusService);
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open menu', () => {
    component._contextualMenu = jasmine.createSpyObj('contextualMenu', ['open']);
    eventBus.publish(new ContextualMenuEvent(null, 'storage-id'));

    expect(component._contextualMenu.open).toHaveBeenCalled();
  });
});
