import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MarkdownStorageNodeEditorComponent } from './markdown-storage-node-editor.component';
import { MarkdownStorageNodeEditorModule } from './markdown-storage-node-editor.module';
import { StorageNodeEditorContentService } from 'projects/storage/src/lib/services/storage-node-editor-content/storage-node-editor-content.service';
import { storageNodeEditorContentServiceSpy } from 'projects/storage/src/lib/services/storage-node-editor-content/storage-node-editor-content.service.spec';
import { STORAGE_NODE } from 'projects/storage/src/lib/entities/storage-node-editor';
import { testStorageFileNode } from 'projects/storage/src/lib/entities/storage-node.spec';

describe('MarkdownStorageNodeEditorComponent', () => {
  let component: MarkdownStorageNodeEditorComponent;
  let fixture: ComponentFixture<MarkdownStorageNodeEditorComponent>;
  let contentService: StorageNodeEditorContentService;

  beforeEach(
    waitForAsync(() => {
      contentService = storageNodeEditorContentServiceSpy();
      TestBed.configureTestingModule({
        imports: [MarkdownStorageNodeEditorModule],
        providers: [
          { provide: StorageNodeEditorContentService, useValue: contentService },
          { provide: STORAGE_NODE, useValue: testStorageFileNode() },
        ],
      })
        .overrideProvider(StorageNodeEditorContentService, { useValue: contentService })
        .overrideTemplate(MarkdownStorageNodeEditorComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownStorageNodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
