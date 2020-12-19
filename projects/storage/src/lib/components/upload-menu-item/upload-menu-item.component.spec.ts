import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UploadMenuItemComponent } from './upload-menu-item.component';
import { UploadMenuItemModule } from './upload-menu-item.module';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';

describe('UploadMenuItemComponent', () => {
  let component: UploadMenuItemComponent;
  let fixture: ComponentFixture<UploadMenuItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [UploadMenuItemModule],
        providers: [
          { provide: StorageService, useValue: storageServiceSpy() },
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
        ],
      })
        .overrideTemplate(UploadMenuItemComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
