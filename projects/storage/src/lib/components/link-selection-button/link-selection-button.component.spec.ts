import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { LocalStorageService } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service';
import { localStorageServiceSpy } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service.spec';
import { SelectNodeEvent } from 'projects/storage/src/lib/entities/select-node-event';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import {
  testStorageDirectoryNode,
  testStorageFileNode
} from 'projects/storage/src/lib/entities/storage-node.spec';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { STORAGE_ROOT_NODE } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { StorageTreeScrollService } from 'projects/storage/src/lib/services/storage-tree-scroll/storage-tree-scroll.service';
import { storageTreeScrollServiceSpy } from 'projects/storage/src/lib/services/storage-tree-scroll/storage-tree-scroll.service.spec';
import { LinkSelectionButtonComponent } from './link-selection-button.component';
import { LinkSelectionButtonModule } from './link-selection-button.module';
import SpyObj = jasmine.SpyObj;

describe('LinkSelectionButtonComponent', () => {
  let fileNode: StorageNode;
  let component: LinkSelectionButtonComponent;
  let fixture: ComponentFixture<LinkSelectionButtonComponent>;
  let eventBus: EventBusService;
  let treeControl: SpyObj<StorageTreeControlService>;
  let scroll: SpyObj<StorageTreeScrollService>;

  beforeEach(
    waitForAsync(() => {
      scroll = storageTreeScrollServiceSpy();
      treeControl = storageTreeControlServiceSpy();
      TestBed.configureTestingModule({
        imports: [LinkSelectionButtonModule],
        providers: [
          { provide: STORAGE_ID, useValue: 'test' },
          { provide: LocalStorageService, useValue: localStorageServiceSpy() },
          { provide: StorageTreeScrollService, useValue: scroll },
          { provide: StorageTreeControlService, useValue: treeControl },
          { provide: EventBusService, useValue: new EventBusService() },
          { provide: STORAGE_ID, useValue: 'storage' },
          { provide: STORAGE_ROOT_NODE, useValue: testStorageDirectoryNode() },
        ],
      })
        .overrideTemplate(LinkSelectionButtonComponent, '')
        .compileComponents();
      eventBus = TestBed.inject(EventBusService);
      fileNode = testStorageFileNode();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSelectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select node', () => {
    eventBus.publish(new SelectNodeEvent(fileNode));

    expect(treeControl.selectOne).toHaveBeenCalledWith(fileNode);
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(scroll.updateScroll).toHaveBeenCalled();
  });

  it('should not select node', () => {
    component.switchLink();
    eventBus.publish(new SelectNodeEvent(fileNode));

    expect(treeControl.selectOne).not.toHaveBeenCalledWith(fileNode);
  });

  it('should not select node (other tree)', () => {
    eventBus.publish(
      new SelectNodeEvent({
        path: 'other/main.html',
        type: 'FILE',
        depth: 1,
        length: 42,
        lastModified: 1337,
      }),
    );

    expect(treeControl.selectOne).not.toHaveBeenCalledWith(fileNode);
  });
});
