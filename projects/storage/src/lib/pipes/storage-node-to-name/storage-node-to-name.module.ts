import { NgModule } from '@angular/core';
import { StorageNodeToNamePipe } from './storage-node-to-name.pipe';

@NgModule({
  declarations: [StorageNodeToNamePipe],
  exports: [StorageNodeToNamePipe],
})
export class StorageNodeToNameModule {}
