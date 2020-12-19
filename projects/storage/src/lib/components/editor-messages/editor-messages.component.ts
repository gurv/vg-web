import { Component } from '@angular/core';
import { StorageNodeEditorContentService } from 'projects/storage/src/lib/services/storage-node-editor-content/storage-node-editor-content.service';

@Component({
  selector: 'lib-editor-messages',
  templateUrl: './editor-messages.component.html',
  styleUrls: ['./editor-messages.component.scss'],
})
export class EditorMessagesComponent {
  constructor(public contentService: StorageNodeEditorContentService) {}
}
