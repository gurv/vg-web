import { Component, Inject, ViewChild } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { ContextualMenuComponent } from 'projects/commons/src/lib/tree/components/contextual-menu/contextual-menu.component';
import { ContextualMenuEvent } from 'projects/storage/src/lib/entities/contextual-menu-event';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lib-storage-contextual-menu',
  templateUrl: './storage-contextual-menu.component.html',
})
export class StorageContextualMenuComponent {
  @ViewChild(ContextualMenuComponent, { static: true }) _contextualMenu: ContextualMenuComponent;

  constructor(
    @Inject(STORAGE_ID) private id: string,
    public treeControl: StorageTreeControlService,
    public copyPaste: CopyPasteService,
    private eventBus: EventBusService,
  ) {
    eventBus
      .of<ContextualMenuEvent>(ContextualMenuEvent.CHANNEL)
      .pipe(filter((event) => event.storageId === id))
      .subscribe((event) => {
        this._contextualMenu.open(event.$event);
      });
  }
}
