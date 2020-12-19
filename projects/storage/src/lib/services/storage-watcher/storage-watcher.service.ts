import { Injectable, OnDestroy } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { SSEEvent } from 'projects/commons/src/lib/sse/entities/sse-event';
import { StorageWatcherEvent } from 'projects/storage/src/lib/entities/storage-watcher-event';
import { NodeCreatedEvent } from 'projects/storage/src/lib/entities/node-created-event';
import { NodeDeletedEvent } from 'projects/storage/src/lib/entities/node-deleted-event';
import { NodeModifiedEvent } from 'projects/storage/src/lib/entities/node-modified-event';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class StorageWatcherService implements OnDestroy {
  _subscription: Subscription;

  constructor(private eventBus: EventBusService) {
    this._subscription = this.eventBus
      .of<SSEEvent>(SSEEvent.CHANNEL)
      .pipe(
        filter((event) => event.wrapper.type === 'NODE'),
        map((event) => event.wrapper.value as StorageWatcherEvent),
      )
      .subscribe((watcherEvent) => {
        switch (watcherEvent.type) {
          case 'CREATE':
            this.eventBus.publish(new NodeCreatedEvent(watcherEvent.node));
            break;
          case 'DELETE':
            this.eventBus.publish(new NodeDeletedEvent(watcherEvent.node));
            break;
          case 'MODIFY':
            this.eventBus.publish(new NodeModifiedEvent(watcherEvent.node));
            break;
        }
      });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
