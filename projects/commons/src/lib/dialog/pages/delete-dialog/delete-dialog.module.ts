import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { DeleteDialogComponent } from './delete-dialog.component';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';

@NgModule({
  imports: [CommonModule, VendorsModule, HelpAnchorModule],
  declarations: [DeleteDialogComponent],
  exports: [DeleteDialogComponent],
})
export class DeleteDialogModule {}
