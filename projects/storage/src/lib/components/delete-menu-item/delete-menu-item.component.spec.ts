import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { DeleteMenuItemComponent } from './delete-menu-item.component';
import { DeleteMenuItemModule } from './delete-menu-item.module';

describe('DeleteMenuItemComponent', () => {
  let component: DeleteMenuItemComponent;
  let fixture: ComponentFixture<DeleteMenuItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DeleteMenuItemModule],
        providers: [
          { provide: StorageService, useValue: storageServiceSpy() },
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
          { provide: STORAGE_ID, useValue: 'storage' },
        ],
      })
        .overrideTemplate(DeleteMenuItemComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete key binding', () => {
    const binding = component.binding;

    expect(binding.keys).toEqual(['Delete', 'ctrl + Delete']);

    spyOn(component, '_handleKey');
    binding.binding({ ctrlKey: true } as any);

    expect(component._handleKey).toHaveBeenCalledWith(jasmine.any(Function));
  });
});
