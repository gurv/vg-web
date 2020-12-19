import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DownloadMenuItemComponent } from './download-menu-item.component';
import { DownloadMenuItemModule } from './download-menu-item.module';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageStaticService } from 'projects/storage/src/lib/services/storage-static/storage-static.service';
import { storageStaticServiceSpy } from 'projects/storage/src/lib/services/storage-static/storage-static.service.spec';

describe('DownloadMenuItemComponent', () => {
  let component: DownloadMenuItemComponent;
  let fixture: ComponentFixture<DownloadMenuItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DownloadMenuItemModule],
        providers: [
          { provide: StorageStaticService, useValue: storageStaticServiceSpy() },
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
        ],
      })
        .overrideTemplate(DownloadMenuItemComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
