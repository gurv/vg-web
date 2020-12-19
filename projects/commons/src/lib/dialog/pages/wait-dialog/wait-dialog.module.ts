import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { WaitDialogComponent } from './wait-dialog.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [WaitDialogComponent],
  exports: [WaitDialogComponent],
})
export class WaitDialogModule {}
