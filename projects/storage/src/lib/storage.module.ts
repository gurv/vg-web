import { ComponentType } from '@angular/cdk/portal';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { SSEModule } from 'projects/commons/src/lib/sse/sse.module';
import { DateModule } from 'projects/commons/src/lib/date/date.module';
import { DeleteFilesDialogModule } from 'projects/storage/src/lib/components/delete-files-dialog/delete-files-dialog.module';
import { FileNameDialogModule } from 'projects/storage/src/lib/components/file-name-dialog/file-name-dialog.module';
import { FileUploadDialogModule } from 'projects/storage/src/lib/components/file-upload-dialog/file-upload-dialog.module';
import { StorageTreeModule } from 'projects/storage/src/lib/components/storage-tree/storage-tree.module';
import { StorageEditorModule } from 'projects/storage/src/lib/components/storage-editor/storage-editor.module';
import { StorageNodeEditor } from 'projects/storage/src/lib/entities/storage-node-editor';
import {
  EditorMatcher,
  STORAGE_DEFAULT_EDITOR,
  STORAGE_EDITORS_MAPPING,
} from 'projects/storage/src/lib/entities/storage-editors-mapping';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { StorageStaticService } from 'projects/storage/src/lib/services/storage-static/storage-static.service';
import { StorageWatcherService } from 'projects/storage/src/lib/services/storage-watcher/storage-watcher.service';

@NgModule({
  imports: [
    VendorsModule,
    SSEModule,
    DateModule,
    DeleteFilesDialogModule,
    FileNameDialogModule,
    FileUploadDialogModule,
    StorageTreeModule,
    StorageEditorModule,
  ],
  exports: [
    DeleteFilesDialogModule,
    FileNameDialogModule,
    FileUploadDialogModule,
    StorageTreeModule,
    StorageEditorModule,
  ],
  providers: [StorageService, StorageStaticService, StorageWatcherService],
})
export class StorageModule {
  public static forRoot(
    id: string,
    editors?: EditorMatcher[],
    defaultEditor?: ComponentType<StorageNodeEditor>,
  ): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        {
          provide: STORAGE_ID,
          useValue: id,
        },
        {
          provide: STORAGE_EDITORS_MAPPING,
          useValue: editors,
        },
        {
          provide: STORAGE_DEFAULT_EDITOR,
          useValue: defaultEditor,
        },
      ],
    };
  }
}
