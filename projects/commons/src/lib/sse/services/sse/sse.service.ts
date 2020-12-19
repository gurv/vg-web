import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { DurationToStringPipe } from 'projects/commons/src/lib/date/pipes/duration-to-string/duration-to-string.pipe';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { BaseNotification } from 'projects/commons/src/lib/notification/entities/base-notification';
import { NotificationEvent } from 'projects/commons/src/lib/notification/entities/notification-event';
import { NotificationLevel } from 'projects/commons/src/lib/notification/entities/notification-level';
import { SecurityService } from 'projects/commons/src/lib/security/services/security/security.service';
import { ReloadEventSourceEvent } from 'projects/commons/src/lib/sse/entities/reload-event-source-event';
import { SSEEvent } from 'projects/commons/src/lib/sse/entities/sse-event';
import { SSEWrapper } from 'projects/commons/src/lib/sse/entities/sse-wrapper';
import { Retry } from 'projects/commons/src/lib/tools/entities/retry';
import { RetriesService } from 'projects/commons/src/lib/tools/services/retries/retries.service';
import { Observer, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { EventSourceService } from '../event-source/event-source.service';
import { SSEConfigurationService } from '../sse-configuration/sse-configuration.service';

@Injectable()
export class SSEService implements OnDestroy, Observer<SSEWrapper> {
  _subscription: Subscription;
  _reloadSubscription: Subscription;
  _retry: Retry;
  closed = false;

  constructor(
    private configuration: ConfigurationService,
    private sseConfiguration: SSEConfigurationService,
    private eventBus: EventBusService,
    private eventSourceService: EventSourceService,
    private security: SecurityService,
    retries: RetriesService,
  ) {
    this._retry = retries.get();
    this._reloadSubscription = this.eventBus
      .of(ReloadEventSourceEvent.CHANNEL)
      .subscribe((value) => this.watch());
    this.watch();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._reloadSubscription.unsubscribe();
    this.closed = true;
  }

  watch() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    const watchUrl = this.sseConfiguration.sseApiUrl(`/watch`);
    const channels = this.sseConfiguration.sseChannels();
    const url = `${watchUrl}?channel=${_.join(channels, '&channel=')}`;
    this._subscription = this.security.token
      .pipe(
        mergeMap((token) =>
          this.eventSourceService.newObservable(url, {
            converter: JSON.parse,
            headers: {
              ApplicationId: this.configuration.applicationId,
              ProjectId: this.configuration.projectId,
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      )
      .subscribe(this);
  }

  next(sseWrapper: SSEWrapper) {
    if (this._retry.isActive()) {
      this._retry.reset();
      this.eventBus.publish(
        new NotificationEvent(
          new BaseNotification(
            `Successfully reconnected to server events.`,
            NotificationLevel.INFO,
          ),
        ),
      );
    }
    this.eventBus.publish(new SSEEvent(sseWrapper));
  }

  complete() {
    this.error(null);
  }

  error(err: any) {
    const delay = this._retry.getDelay();
    this.eventBus.publish(
      new NotificationEvent(
        new BaseNotification(
          `An error occurred while listening for server events. Will reconnect in ${new DurationToStringPipe().transform(
            delay,
          )}.`,
          NotificationLevel.ERROR,
        ),
      ),
    );
    if (this.closed) {
      return;
    }
    setTimeout(() => {
      this.watch();
      this.eventBus.publish(new ReloadEventSourceEvent());
    }, delay);
  }
}
