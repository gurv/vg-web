import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { NewFileMenuItemComponent } from './new-file-menu-item.component';
import { NewFileMenuItemModule } from './new-file-menu-item.module';

describe('NewFileMenuItemComponent', () => {
  let component: NewFileMenuItemComponent;
  let fixture: ComponentFixture<NewFileMenuItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NewFileMenuItemModule],
        providers: [
          { provide: StorageService, useValue: storageServiceSpy() },
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
        ],
      })
        .overrideTemplate(NewFileMenuItemComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
