import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

library.add(faUpload);

@Component({
  selector: 'lib-upload-menu-item',
  templateUrl: './upload-menu-item.component.html',
  styles: [],
})
export class UploadMenuItemComponent {
  readonly uploadFileIcon = new IconFa(faUpload);

  constructor(public storage: StorageService, public treeControl: StorageTreeControlService) {}
}
