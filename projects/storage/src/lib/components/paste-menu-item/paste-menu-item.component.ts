import { Component, Inject } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { KeyBoundMenuItemDirective } from 'projects/storage/src/lib/directives/key-bound-menu-item.directive';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';

library.add(faPaste);

@Component({
  selector: 'lib-paste-menu-item',
  templateUrl: './paste-menu-item.component.html',
  styles: [],
})
export class PasteMenuItemComponent extends KeyBoundMenuItemDirective {
  readonly pasteIcon = new IconFa(faPaste);

  constructor(
    @Inject(STORAGE_ID) private id: string,
    public treeControl: StorageTreeControlService,
    public copyPaste: CopyPasteService,
    keys: KeyBindingsService,
  ) {
    super(
      treeControl,
      keys,
      new KeyBinding(
        ['ctrl + v'],
        () => {
          if (this.treeControl.hasSingleOrNoSelection) {
            this.copyPaste.paste(this.treeControl.selectedDirectory);
            return true;
          }
          return false;
        },
        id,
      ),
    );
  }
}
