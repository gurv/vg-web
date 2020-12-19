import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { StorageStaticService } from 'projects/storage/src/lib/services/storage-static/storage-static.service';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';

library.add(faDownload);

@Component({
  selector: 'lib-download-menu-item',
  templateUrl: './download-menu-item.component.html',
  styles: [],
})
export class DownloadMenuItemComponent {
  readonly downloadIcon = new IconFa(faDownload);

  constructor(
    public storage: StorageStaticService,
    public treeControl: StorageTreeControlService,
  ) {}
}
