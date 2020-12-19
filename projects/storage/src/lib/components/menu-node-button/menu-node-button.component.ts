import { Component, Input } from '@angular/core';
import { MENU_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';

@Component({
  selector: 'lib-menu-node-button',
  templateUrl: './menu-node-button.component.html',
})
export class MenuNodeButtonComponent {
  @Input() node: StorageNode;

  readonly menuIcon = MENU_ICON;

  constructor(public treeControl: StorageTreeControlService) {}
}
