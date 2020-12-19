import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { OwnerSelectorComponent } from './owner-selector.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [OwnerSelectorComponent],
  exports: [OwnerSelectorComponent],
})
export class OwnerSelectorModule {}
