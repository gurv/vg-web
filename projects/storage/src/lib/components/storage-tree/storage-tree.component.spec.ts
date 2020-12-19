import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';
import { StorageContextualMenuComponent } from 'projects/storage/src/lib/components/storage-contextual-menu/storage-contextual-menu.component';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import {
  testStorageDirectoryNode,
  testStorageFileNode,
  testStorageNodes,
  testStorageRootNode
} from 'projects/storage/src/lib/entities/storage-node.spec';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { copyPasteServiceSpy } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service.spec';
import { StorageKeyBindingService } from 'projects/storage/src/lib/services/storage-key-binding/storage-key-binding.service';
import { storageKeyBindingServiceSpy } from 'projects/storage/src/lib/services/storage-key-binding/storage-key-binding.service.spec';
import { storageListServiceSpy } from 'projects/storage/src/lib/services/storage-list/storage-list.service.spec';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import {
  StorageTreeDataSourceService,
  STORAGE_ROOT_NODE,
} from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { storageTreeDataSourceServiceSpy } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { StorageListService } from 'projects/storage/src/lib/services/storage-list/storage-list.service';
import { StorageTreeComponent, STORAGE_CONTEXTUAL_MENU } from './storage-tree.component';
import { StorageTreeModule } from './storage-tree.module';
import SpyObj = jasmine.SpyObj;

describe('StorageTreeComponent', () => {
  let component: StorageTreeComponent;
  let fixture: ComponentFixture<StorageTreeComponent>;
  let treeControl: StorageTreeControlService;
  let dataSource: StorageTreeDataSourceService;
  let eventBus: SpyObj<EventBusService>;
  let fileNode: StorageNode;
  let directoryNode: StorageNode;
  let rootNode: StorageNode;

  beforeEach(
    waitForAsync(() => {
      treeControl = storageTreeControlServiceSpy();
      dataSource = storageTreeDataSourceServiceSpy();
      eventBus = eventBusSpy();
      rootNode = testStorageRootNode();

      TestBed.configureTestingModule({
        imports: [StorageTreeModule],
        providers: [
          { provide: StorageService, useValue: storageServiceSpy() },
          { provide: STORAGE_CONTEXTUAL_MENU, useValue: StorageContextualMenuComponent },
          { provide: STORAGE_ID, useValue: 'storage' },
          { provide: STORAGE_ROOT_NODE, useValue: rootNode },
          { provide: EventBusService, useValue: eventBus },
          { provide: StorageKeyBindingService, useValue: storageKeyBindingServiceSpy },
        ],
      })
        .overrideProvider(StorageListService, { useValue: storageListServiceSpy() })
        .overrideProvider(StorageTreeControlService, { useValue: treeControl })
        .overrideProvider(StorageTreeDataSourceService, { useValue: dataSource })
        .overrideProvider(CopyPasteService, { useValue: copyPasteServiceSpy() })
        .overrideProvider(StorageKeyBindingService, { useValue: storageKeyBindingServiceSpy() })
        .overrideTemplate(StorageTreeComponent, '')
        .compileComponents();

      fileNode = testStorageFileNode();
      directoryNode = testStorageDirectoryNode();
    }),
  );

  beforeEach(() => {
    dataSource.data = testStorageNodes();
    fixture = TestBed.createComponent(StorageTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should selectHelpPage', () => {
    component.selectHelpPage();

    expect(eventBus.publish).toHaveBeenCalledWith(new SelectHelpEvent('storage' as any));
  });

  it('should depth', () => {
    expect(component.depth(testStorageFileNode())).toEqual(1);
    expect(component.depth(testStorageDirectoryNode())).toEqual(0);
  });

  it('should depth other root', () => {
    rootNode.depth = 1;

    expect(component.depth(testStorageFileNode())).toEqual(-1);
  });
});
