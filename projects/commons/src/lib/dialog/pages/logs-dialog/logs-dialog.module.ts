import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { LogsDialogComponent } from './logs-dialog.component';
import { CodeEditorModule } from 'projects/editor/src/lib/components/code-editor/code-editor.module';

@NgModule({
  imports: [CommonModule, VendorsModule, CodeEditorModule],
  declarations: [LogsDialogComponent],
  exports: [LogsDialogComponent],
})
export class LogsDialogModule {}
