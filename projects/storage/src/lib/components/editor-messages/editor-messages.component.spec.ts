import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditorMessagesComponent } from './editor-messages.component';
import { EditorMessagesModule } from './editor-messages.module';
import { StorageNodeEditorContentService } from 'projects/storage/src/lib/services/storage-node-editor-content/storage-node-editor-content.service';
import { storageNodeEditorContentServiceSpy } from 'projects/storage/src/lib/services/storage-node-editor-content/storage-node-editor-content.service.spec';

describe('EditorMessagesComponent', () => {
  let component: EditorMessagesComponent;
  let fixture: ComponentFixture<EditorMessagesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [EditorMessagesModule],
        declarations: [EditorMessagesComponent],
        providers: [
          {
            provide: StorageNodeEditorContentService,
            useValue: storageNodeEditorContentServiceSpy(),
          },
        ],
      })
        .overrideTemplate(EditorMessagesComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
