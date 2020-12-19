import { NgModule } from '@angular/core';
import { StorageNodeToExtPipe } from './storage-node-to-ext.pipe';

@NgModule({
  declarations: [StorageNodeToExtPipe],
  exports: [StorageNodeToExtPipe],
})
export class StorageNodeToExtModule {}
