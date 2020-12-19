import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { NewDirectoryMenuItemComponent } from './new-directory-menu-item.component';
import { NewDirectoryMenuItemModule } from './new-directory-menu-item.module';

describe('NewDirectoryMenuItemComponent', () => {
  let component: NewDirectoryMenuItemComponent;
  let fixture: ComponentFixture<NewDirectoryMenuItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NewDirectoryMenuItemModule],
        providers: [
          { provide: StorageService, useValue: storageServiceSpy() },
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
        ],
      })
        .overrideTemplate(NewDirectoryMenuItemComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDirectoryMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
