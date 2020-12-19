import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ColorToFillClassModule } from 'projects/commons/src/lib/color/pipes/color-to-fill-class/color-to-fill-class.module';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [CommonModule, VendorsModule, ColorToFillClassModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
