import { Component, Inject, OnDestroy } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { IconDynamic } from 'projects/commons/src/lib/icon/entities/icon-dynamic';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { LocalStorageService } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service';
import { SelectNodeEvent } from 'projects/storage/src/lib/entities/select-node-event';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { STORAGE_ROOT_NODE } from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { StorageTreeScrollService } from 'projects/storage/src/lib/services/storage-tree-scroll/storage-tree-scroll.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

library.add(faLink, faUnlink);

@Component({
  selector: 'lib-link-selection-button',
  templateUrl: './link-selection-button.component.html',
  styleUrls: ['./link-selection-button.component.css']
})
export class LinkSelectionButtonComponent implements OnDestroy {
  readonly linkSelectionIcon = new IconDynamic(new IconFa(faLink), {
    unlink: new IconFa(faUnlink),
  });

  public link: BehaviorSubject<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(@Inject(STORAGE_ID) private id: string,
    @Inject(STORAGE_ROOT_NODE) private rootNode: StorageNode,
    private scroll: StorageTreeScrollService,
    private treeControl: StorageTreeControlService,
    private eventBus: EventBusService,
    private localStorage: LocalStorageService) {
    const linkId = this.id + 'link-selection';
    this.link = new BehaviorSubject<boolean>(this.localStorage.getBoolean(linkId, true));
    this.subscriptions.push(this.link.subscribe((value) => this.localStorage.set(linkId, value)));
    this.subscriptions.push(this.eventBus.of<SelectNodeEvent>(SelectNodeEvent.CHANNEL)
      .pipe(
        filter(
          (event) => this.link.value && event.node && event.node.path.startsWith(rootNode.path),
        ),
      )
      .subscribe((event) => {
        this.treeControl.selectOne(event.node);
        this.scroll.updateScroll();
      }),
    );
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  switchLink() {
    this.link.next(!this.link.value);
  }
}
