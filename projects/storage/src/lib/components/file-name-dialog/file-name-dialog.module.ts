import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';
import { FileNameDialogComponent } from './file-name-dialog.component';

@NgModule({
  imports: [CommonModule, VendorsModule, HelpAnchorModule],
  declarations: [FileNameDialogComponent],
  exports: [FileNameDialogComponent],
})
export class FileNameDialogModule {}
