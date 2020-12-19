import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { StorageNodeComponent } from './storage-node.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [StorageNodeComponent],
  exports: [StorageNodeComponent],
})
export class StorageNodeModule {}
