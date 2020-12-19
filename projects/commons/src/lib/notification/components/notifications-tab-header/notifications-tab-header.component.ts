import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { IconFaCounter } from 'projects/commons/src/lib/icon/entities/icon-fa-counter';
import { NotificationService } from 'projects/commons/src/lib/notification/services/notification/notification.service';
import {
  SIDE_HEADER_DATA,
  TabHeaderComponent,
  TAB_HEADER_DATA
} from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-notifications-tab-header',
  templateUrl: './notifications-tab-header.component.html',
  styleUrls: ['./notifications-tab-header.component.scss'],
})
export class NotificationsTabHeaderComponent
  extends TabHeaderComponent
  implements OnInit, OnDestroy {
  public icon: IconFaCounter;
  private notificationSubscription: Subscription;

  constructor(
    @Inject(TAB_HEADER_DATA) tab: Tab,
    @Inject(SIDE_HEADER_DATA) side: TabsSide,
    tabsService: TabsService,
    eventBus: EventBusService,
    public notificationsService: NotificationService,
  ) {
    super(tab, side, tabsService, eventBus);
  }

  ngOnInit() {
    this.icon = new IconFaCounter(this.tab.icon as IconFa, '', 'error');
    this.notificationSubscription = this.notificationsService.notificationsSubject.subscribe(() => {
      this.icon.content = `${Math.min(this.notificationsService.count, 99)}`;
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.notificationSubscription.unsubscribe();
  }
}
