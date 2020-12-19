import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { StorageNodeTabHeaderComponent } from './storage-node-tab-header.component';
import { StorageNodeToIconModule } from 'projects/storage/src/lib/pipes/storage-node-to-icon/storage-node-to-icon.module';
import { StorageNodeToNameModule } from 'projects/storage/src/lib/pipes/storage-node-to-name/storage-node-to-name.module';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    IconModule,
    StorageNodeToIconModule,
    StorageNodeToNameModule,
  ],
  declarations: [StorageNodeTabHeaderComponent],
  exports: [StorageNodeTabHeaderComponent],
})
export class StorageNodeTabHeaderModule {}
