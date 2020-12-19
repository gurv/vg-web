import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { LinkSelectionButtonModule } from 'projects/storage/src/lib/components/link-selection-button/link-selection-button.module';
import { StorageTreeComponent } from './storage-tree.component';

@NgModule({
  imports: [CommonModule, VendorsModule, LinkSelectionButtonModule, IconModule],
  declarations: [StorageTreeComponent],
  exports: [StorageTreeComponent],
})
export class StorageTreeModule {}
