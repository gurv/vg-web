import { Component, Input } from '@angular/core';
import { RENAME_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageTreeDataSourceService } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

@Component({
  selector: 'lib-rename-node-button',
  templateUrl: './rename-node-button.component.html',
})
export class RenameNodeButtonComponent {
  @Input() node: StorageNode;

  readonly renameIcon = RENAME_ICON;

  constructor(public dataSource: StorageTreeDataSourceService, public storage: StorageService) {}
}
