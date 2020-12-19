import { Component, Inject } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCut } from '@fortawesome/free-solid-svg-icons/faCut';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { KeyBoundMenuItemDirective } from 'projects/storage/src/lib/directives/key-bound-menu-item.directive';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';

library.add(faCut);

@Component({
  selector: 'lib-cut-menu-item',
  templateUrl: './cut-menu-item.component.html',
  styles: [],
})
export class CutMenuItemComponent extends KeyBoundMenuItemDirective {
  readonly cutIcon = new IconFa(faCut);

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
        ['ctrl + x'],
        () => this._handleKey(this.copyPaste.cut.bind(this.copyPaste)),
        id,
      ),
    );
  }
}
