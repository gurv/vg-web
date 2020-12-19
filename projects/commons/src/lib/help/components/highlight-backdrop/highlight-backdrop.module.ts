import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { HighlightBackdropComponent } from './highlight-backdrop.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [HighlightBackdropComponent],
  exports: [HighlightBackdropComponent],
})
export class HighlightBackdropModule {}
