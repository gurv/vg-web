import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
