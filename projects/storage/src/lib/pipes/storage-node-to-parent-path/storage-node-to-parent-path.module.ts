import { NgModule } from '@angular/core';
import { StorageNodeToParentPathPipe } from './storage-node-to-parent-path.pipe';

@NgModule({
  declarations: [StorageNodeToParentPathPipe],
  exports: [StorageNodeToParentPathPipe],
})
export class StorageNodeToParentPathModule {}
