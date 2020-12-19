import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HighlightService } from 'projects/commons/src/lib/help/services/highlight/highlight.service';
import { Notification } from 'projects/commons/src/lib/notification/entities/notification';
import { NotificationEvent } from 'projects/commons/src/lib/notification/entities/notification-event';
import { OpenNotificationsEvent } from 'projects/commons/src/lib/notification/entities/open-notifications-event';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class NotificationService implements OnDestroy {
  notifications: Notification[];
  public notificationsSubject: BehaviorSubject<Notification[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private eventBus: EventBusService,
    private snackBar: MatSnackBar,
    private tabsService: TabsService,
    private highlight: HighlightService,
  ) {
    this.notifications = [];
    this.notificationsSubject = new BehaviorSubject<Notification[]>(this.notifications);
    this.subscriptions.push(
      this.eventBus.of<NotificationEvent>(NotificationEvent.CHANNEL).subscribe((event) => {
        this.notifications.splice(0, 0, event.notification);
        this.notificationsSubject.next(this.notifications);
        this.subscriptions.push(
          this.snackBar
            .open(event.notification.message, 'Open', {
              panelClass: 'snackbar-long-text',
            })
            .onAction()
            .subscribe(this._snackbarAction.bind(this)),
        );
      }),
    );
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  clear() {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }

  get count(): number {
    return this.notifications.length;
  }

  _snackbarAction() {
    if (this.tabsService.isSelected({ label: 'Notifications' })) {
      this.highlight.highlight('lib-notification-table');
    } else {
      this.eventBus.publish(new OpenNotificationsEvent());
    }
  }
}
