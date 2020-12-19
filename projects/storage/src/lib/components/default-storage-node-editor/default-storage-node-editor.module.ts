import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { CodeEditorModule } from 'projects/editor/src/lib/components/code-editor/code-editor.module';
import { EditorMessagesModule } from 'projects/storage/src/lib/components/editor-messages/editor-messages.module';
import { DefaultStorageNodeEditorComponent } from './default-storage-node-editor.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule, CodeEditorModule, EditorMessagesModule],
  declarations: [DefaultStorageNodeEditorComponent],
  exports: [DefaultStorageNodeEditorComponent],
})
export class DefaultStorageNodeEditorModule {}
