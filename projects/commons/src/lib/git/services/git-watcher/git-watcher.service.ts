import { Injectable, OnDestroy } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitLogEvent } from 'projects/commons/src/lib/git/entities/git-log-event';
import { GitRefreshStorageEvent } from 'projects/commons/src/lib/git/entities/git-refresh-storage-event';
import { GitStatusEvent } from 'projects/commons/src/lib/git/entities/git-status-event';
import { SSEEvent } from 'projects/commons/src/lib/sse/entities/sse-event';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class GitWatcherService implements OnDestroy {
  _statusSubscription: Subscription;
  _logsSubscription: Subscription;
  _refreshSubscription: Subscription;

  constructor(private eventBus: EventBusService) {
    this._statusSubscription = this.eventBus
      .of<SSEEvent>(SSEEvent.CHANNEL)
      .pipe(
        filter((event) => event.wrapper.type === 'GIT_STATUS'),
        map((event) => event.wrapper.value),
      )
      .subscribe((value) => eventBus.publish(new GitStatusEvent(value)));

    this._logsSubscription = this.eventBus
      .of<SSEEvent>(SSEEvent.CHANNEL)
      .pipe(
        filter((event) => event.wrapper.type === 'GIT_LOG'),
        map((event) => event.wrapper.value),
      )
      .subscribe((value) => eventBus.publish(new GitLogEvent(value.text)));

    this._refreshSubscription = this.eventBus
      .of<SSEEvent>(SSEEvent.CHANNEL)
      .pipe(filter((event) => event.wrapper.type === 'GIT_REFRESH'))
      .subscribe(() => eventBus.publish(new GitRefreshStorageEvent()));
  }

  ngOnDestroy() {
    this._statusSubscription.unsubscribe();
    this._logsSubscription.unsubscribe();
    this._refreshSubscription.unsubscribe();
  }
}
