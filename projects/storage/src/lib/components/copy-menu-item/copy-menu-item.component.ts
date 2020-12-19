import { Component, Inject } from '@angular/core';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { library } from '@fortawesome/fontawesome-svg-core';
import { KeyBoundMenuItemDirective } from 'projects/storage/src/lib/directives/key-bound-menu-item.directive';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';

library.add(faCopy);

@Component({
  selector: 'lib-copy-menu-item',
  templateUrl: './copy-menu-item.component.html',
  styles: [],
})
export class CopyMenuItemComponent extends KeyBoundMenuItemDirective {
  readonly copyIcon = new IconFa(faCopy);

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
        ['ctrl + c'],
        () => this._handleKey(this.copyPaste.copy.bind(this.copyPaste)),
        id,
      ),
    );
  }
}
