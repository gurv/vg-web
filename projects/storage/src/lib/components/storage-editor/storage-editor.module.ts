import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { StorageNodeToIconModule } from 'projects/storage/src/lib/pipes/storage-node-to-icon/storage-node-to-icon.module';
import { StorageNodeToNameModule } from 'projects/storage/src/lib/pipes/storage-node-to-name/storage-node-to-name.module';
import { StorageNodeToParentPathModule } from 'projects/storage/src/lib/pipes/storage-node-to-parent-path/storage-node-to-parent-path.module';
import { StorageNodeToExtModule } from 'projects/storage/src/lib/pipes/storage-node-to-ext/storage-node-to-ext.module';
import { NodeEventToNodeModule } from 'projects/storage/src/lib/pipes/node-event-to-node/node-event-to-node.module';
import { StorageNodeToPredicateModule } from 'projects/storage/src/lib/pipes/storage-node-to-predicate/storage-node-to-predicate.module';
import { StorageNodeTabHeaderModule } from 'projects/storage/src/lib/components/storage-node-tab-header/storage-node-tab-header.module';
import { ContextualMenuModule } from 'projects/commons/src/lib/tree/components/contextual-menu/contextual-menu.module';
import { StorageEditorComponent } from './storage-editor.component';
import { StorageEditorService } from 'projects/storage/src/lib/services/storage-editor/storage-editor.service';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    IconModule,
    StorageNodeToIconModule,
    StorageNodeToNameModule,
    StorageNodeToParentPathModule,
    StorageNodeToExtModule,
    NodeEventToNodeModule,
    StorageNodeToPredicateModule,
    StorageNodeTabHeaderModule,
    ContextualMenuModule,
  ],
  declarations: [StorageEditorComponent],
  exports: [StorageEditorComponent],
  providers: [
    StorageNodeToIconModule,
    StorageNodeToNameModule,
    StorageNodeToParentPathModule,
    StorageNodeToExtModule,
    NodeEventToNodeModule,
    StorageNodeToPredicateModule,
    StorageEditorService,
  ],
})
export class StorageEditorModule {}
