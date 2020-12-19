import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { IconFaAddon } from 'projects/commons/src/lib/icon/entities/icon-fa-addon';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

library.add(faFolder, faPlus);

@Component({
  selector: 'lib-new-directory-menu-item',
  templateUrl: './new-directory-menu-item.component.html',
})
export class NewDirectoryMenuItemComponent {
  readonly addDirectoryIcon = new IconFaAddon(
    new IconFa(faFolder),
    new IconFa(faPlus, 'success', 'shrink-4 up-6 left-7'),
  );

  constructor(public storage: StorageService, public treeControl: StorageTreeControlService) {}
}
