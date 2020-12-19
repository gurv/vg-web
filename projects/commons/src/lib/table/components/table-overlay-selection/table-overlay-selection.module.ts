import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { TableOverlaySelectionComponent } from './table-overlay-selection.component';
import { TableOverlayModule } from '../table-overlay/table-overlay.module';

@NgModule({
  imports: [CommonModule, VendorsModule, TableOverlayModule],
  declarations: [TableOverlaySelectionComponent],
  exports: [TableOverlaySelectionComponent],
})
export class TableOverlaySelectionModule {}
