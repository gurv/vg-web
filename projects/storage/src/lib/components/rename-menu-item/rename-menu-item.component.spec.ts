import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import {
  testStorageFileNode,
  testStorageRootNode
} from 'projects/storage/src/lib/entities/storage-node.spec';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageTreeDataSourceService } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { storageTreeDataSourceServiceSpy } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { RenameMenuItemComponent } from './rename-menu-item.component';
import { RenameMenuItemModule } from './rename-menu-item.module';
import SpyObj = jasmine.SpyObj;

describe('RenameMenuItemComponent', () => {
  let component: RenameMenuItemComponent;
  let fixture: ComponentFixture<RenameMenuItemComponent>;
  let treeControl: SpyObj<StorageTreeControlService>;
  let datasource: SpyObj<StorageTreeDataSourceService>;
  let storage: SpyObj<StorageService>;

  beforeEach(
    waitForAsync(() => {
      treeControl = storageTreeControlServiceSpy();
      datasource = storageTreeDataSourceServiceSpy();
      storage = storageServiceSpy();
      TestBed.configureTestingModule({
        imports: [RenameMenuItemModule],
        providers: [
          { provide: StorageTreeDataSourceService, useValue: datasource },
          { provide: StorageService, useValue: storage },
          { provide: StorageTreeControlService, useValue: treeControl },
          { provide: STORAGE_ID, useValue: 'storage' },
        ],
      })
        .overrideTemplate(RenameMenuItemComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rename', () => {
    const ctrl = component.treeControl as any;
    ctrl.hasSingleSelection = true;
    ctrl.first = testStorageFileNode();
    datasource.parentNode.and.returnValue(testStorageRootNode());
    const binding = component.binding;

    expect(binding.keys).toEqual(['F2']);
    expect(binding.binding(null)).toBe(true);
    expect(storage.rename).toHaveBeenCalledWith(testStorageFileNode(), testStorageRootNode());
  });

  it('should not rename', () => {
    const ctrl = component.treeControl as any;
    ctrl.hasSingleSelection = false;
    const binding = component.binding;

    expect(binding.binding(null)).toBe(false);
  });
});