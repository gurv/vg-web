import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageNodeButtonsComponent } from './storage-node-buttons.component';
import { StorageNodeButtonsModule } from './storage-node-buttons.module';
import { STORAGE_NODE } from 'projects/storage/src/lib/entities/storage-node-editor';
import { testStorageFileNode } from 'projects/storage/src/lib/entities/storage-node.spec';

describe('StorageNodeButtonsComponent', () => {
  let component: StorageNodeButtonsComponent;
  let fixture: ComponentFixture<StorageNodeButtonsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StorageNodeButtonsModule],
        providers: [{ provide: STORAGE_NODE, useValue: testStorageFileNode() }],
      })
        .overrideTemplate(StorageNodeButtonsComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageNodeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
