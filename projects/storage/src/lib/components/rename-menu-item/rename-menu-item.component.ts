import { Component, Inject } from '@angular/core';
import { RENAME_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { KeyBoundMenuItemDirective } from 'projects/storage/src/lib/directives/key-bound-menu-item.directive';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { StorageTreeDataSourceService } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

@Component({
  selector: 'lib-rename-menu-item',
  templateUrl: './rename-menu-item.component.html',
})
export class RenameMenuItemComponent extends KeyBoundMenuItemDirective {
  readonly renameIcon = RENAME_ICON;

  constructor(
    @Inject(STORAGE_ID) private id: string,
    private dataSource: StorageTreeDataSourceService,
    private storage: StorageService,
    public treeControl: StorageTreeControlService,
    keys: KeyBindingsService,
  ) {
    super(treeControl, keys, new KeyBinding(['F2'], () => this.rename(), id));
  }

  public canRename(): boolean {
    return this.treeControl.hasSingleSelection;
  }

  public rename(): boolean {
    if (this.canRename()) {
      this.storage.rename(
        this.treeControl.first,
        this.dataSource.parentNode(this.treeControl.first),
      );
      return true;
    }
    return false;
  }
}
