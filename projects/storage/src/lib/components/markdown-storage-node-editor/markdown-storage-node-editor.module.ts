import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { CodeEditorModule } from 'projects/editor/src/lib/components/code-editor/code-editor.module';
import { EditorMessagesModule } from 'projects/storage/src/lib/components/editor-messages/editor-messages.module';
import { MarkdownStorageNodeEditorComponent } from './markdown-storage-node-editor.component';

@NgModule({
  imports: [CommonModule, VendorsModule, CodeEditorModule, EditorMessagesModule],
  declarations: [MarkdownStorageNodeEditorComponent],
  exports: [MarkdownStorageNodeEditorComponent],
})
export class MarkdownStorageNodeEditorModule {}
