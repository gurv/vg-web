import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { CLOSE_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import { CloseTabsEvent } from 'projects/commons/src/lib/tabs/entities/close-tabs-event';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';

@Component({
  selector: 'lib-storage-node-tab-header',
  templateUrl: './storage-node-tab-header.component.html',
  styleUrls: ['./storage-node-tab-header.component.scss']
})
export class StorageNodeTabHeaderComponent {
  @Input() node: StorageNode;
  @Input() selected: boolean;
  @Input() pendingSave: boolean;
  @Output() closeNode = new EventEmitter<void>();
  @Output() openContextualMenu = new EventEmitter<MouseEvent>();

  readonly closeIcon = CLOSE_ICON;

  constructor(private eventBus: EventBusService) { }

  expand() {
    this.eventBus.publish(new CloseTabsEvent());
  }
}
