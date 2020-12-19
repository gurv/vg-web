import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';
import { DeleteFilesDialogComponent } from './delete-files-dialog.component';

@NgModule({
  imports: [CommonModule, VendorsModule, MessageModule, HelpAnchorModule],
  declarations: [DeleteFilesDialogComponent],
  exports: [DeleteFilesDialogComponent],
})
export class DeleteFilesDialogModule {}
