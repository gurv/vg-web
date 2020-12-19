import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { SplitPanesComponent } from './split-panes.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [SplitPanesComponent],
  exports: [SplitPanesComponent],
})
export class SplitPanesModule {}
