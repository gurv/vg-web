import { Component, Inject } from '@angular/core';
import { DELETE_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { KeyBoundMenuItemDirective } from 'projects/storage/src/lib/directives/key-bound-menu-item.directive';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

@Component({
  selector: 'lib-delete-menu-item',
  templateUrl: './delete-menu-item.component.html',
  styles: [],
})
export class DeleteMenuItemComponent extends KeyBoundMenuItemDirective {
  readonly deleteIcon = DELETE_ICON;

  constructor(
    @Inject(STORAGE_ID) private id: string,
    public storage: StorageService,
    public treeControl: StorageTreeControlService,
    keys: KeyBindingsService,
  ) {
    super(
      treeControl,
      keys,
      new KeyBinding(
        ['Delete', 'ctrl + Delete'],
        (event: KeyboardEvent) =>
          this._handleKey(
            this.storage.deleteFiles.bind(this.storage, this.treeControl.selected, event.ctrlKey),
          ),
        id,
      ),
    );
  }
}
