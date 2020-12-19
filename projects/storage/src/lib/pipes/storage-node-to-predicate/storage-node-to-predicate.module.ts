import { NgModule } from '@angular/core';
import { StorageNodeToPredicatePipe } from './storage-node-to-predicate.pipe';

@NgModule({
  declarations: [StorageNodeToPredicatePipe],
  exports: [StorageNodeToPredicatePipe],
})
export class StorageNodeToPredicateModule {}
