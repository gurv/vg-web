import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { IconFaAddon } from 'projects/commons/src/lib/icon/entities/icon-fa-addon';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

library.add(faFile, faPlus);

@Component({
  selector: 'lib-new-file-menu-item',
  templateUrl: './new-file-menu-item.component.html',
  styles: []
})
export class NewFileMenuItemComponent {
  readonly addFileIcon = new IconFaAddon(
    new IconFa(faFile),
    new IconFa(faPlus, 'success', 'shrink-4 up-7 left-5'),
  );

  constructor(public storage: StorageService, public treeControl: StorageTreeControlService) { }
}
