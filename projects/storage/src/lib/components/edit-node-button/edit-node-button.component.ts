import { Component, Input } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';

library.add(faEdit);

@Component({
  selector: 'lib-edit-node-button',
  templateUrl: './edit-node-button.component.html',
})
export class EditNodeButtonComponent {
  @Input() node: StorageNode;

  readonly editIcon = new IconFa(faEdit);

  constructor(private storage: StorageService) { }
}
