import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageTreeDataSourceService } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { storageTreeDataSourceServiceSpy } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { RenameNodeButtonComponent } from './rename-node-button.component';
import { RenameNodeButtonModule } from './rename-node-button.module';

describe('RenameNodeButtonComponent', () => {
  let component: RenameNodeButtonComponent;
  let fixture: ComponentFixture<RenameNodeButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RenameNodeButtonModule],
        providers: [
          { provide: StorageTreeDataSourceService, useValue: storageTreeDataSourceServiceSpy() },
          { provide: StorageService, useValue: storageServiceSpy() },
        ],
      })
        .overrideTemplate(RenameNodeButtonComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameNodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
