import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { TabSelectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-selected-event';
import { TabUnselectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-unselected-event';
import { Subscription } from 'rxjs';

@Injectable()
export class TabsService implements OnDestroy {
  selectedTabs: Tab[] = [];

  private subscriptions: Subscription[] = [];

  constructor(eventBus: EventBusService) {
    this.subscriptions.push(
      eventBus
        .of<TabSelectedEvent>(TabSelectedEvent.CHANNEL)
        .subscribe((event) => this.selectedTabs.push(event.tab)),
    );
    this.subscriptions.push(
      eventBus
        .of<TabUnselectedEvent>(TabUnselectedEvent.CHANNEL)
        .subscribe((event) => _.pull(this.selectedTabs, event.tab)),
    );
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  isSelected(predicate: any): boolean {
    return _.findIndex(this.selectedTabs, predicate) !== -1;
  }
}
