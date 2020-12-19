import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageNodeButtonsComponent } from './storage-node-buttons.component';
import { EditNodeButtonModule } from 'projects/storage/src/lib/components/edit-node-button/edit-node-button.module';
import { RenameNodeButtonModule } from 'projects/storage/src/lib/components/rename-node-button/rename-node-button.module';
import { MenuNodeButtonModule } from 'projects/storage/src/lib/components/menu-node-button/menu-node-button.module';

@NgModule({
  imports: [CommonModule, EditNodeButtonModule, RenameNodeButtonModule, MenuNodeButtonModule],
  declarations: [StorageNodeButtonsComponent],
  exports: [StorageNodeButtonsComponent],
})
export class StorageNodeButtonsModule {}
