import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { LoadingIconModule } from 'projects/commons/src/lib/loading/components/loading-icon/loading-icon.module';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';
import { FileUploadDialogComponent } from './file-upload-dialog.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule, LoadingIconModule, HelpAnchorModule],
  declarations: [FileUploadDialogComponent],
  exports: [FileUploadDialogComponent],
})
export class FileUploadDialogModule {}
