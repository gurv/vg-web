import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { StorageContextualMenuComponent } from './storage-contextual-menu.component';
import { ContextualMenuModule } from 'projects/commons/src/lib/tree/components/contextual-menu/contextual-menu.module';
import { NewDirectoryMenuItemModule } from 'projects/storage/src/lib/components/new-directory-menu-item/new-directory-menu-item.module';
import { NewFileMenuItemModule } from 'projects/storage/src/lib/components/new-file-menu-item/new-file-menu-item.module';
import { UploadMenuItemModule } from 'projects/storage/src/lib/components/upload-menu-item/upload-menu-item.module';
import { DownloadMenuItemModule } from 'projects/storage/src/lib/components/download-menu-item/download-menu-item.module';
import { RenameMenuItemModule } from 'projects/storage/src/lib/components/rename-menu-item/rename-menu-item.module';
import { CopyMenuItemModule } from 'projects/storage/src/lib/components/copy-menu-item/copy-menu-item.module';
import { CutMenuItemModule } from 'projects/storage/src/lib/components/cut-menu-item/cut-menu-item.module';
import { PasteMenuItemModule } from 'projects/storage/src/lib/components/paste-menu-item/paste-menu-item.module';
import { DeleteMenuItemModule } from 'projects/storage/src/lib/components/delete-menu-item/delete-menu-item.module';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    ContextualMenuModule,
    NewDirectoryMenuItemModule,
    NewFileMenuItemModule,
    UploadMenuItemModule,
    DownloadMenuItemModule,
    RenameMenuItemModule,
    CopyMenuItemModule,
    CutMenuItemModule,
    PasteMenuItemModule,
    DeleteMenuItemModule,
  ],
  declarations: [StorageContextualMenuComponent],
  exports: [StorageContextualMenuComponent],
})
export class StorageContextualMenuModule {}
