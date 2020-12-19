import { Component, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { TabSelectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-selected-event';
import { TabUnselectedEvent } from 'projects/commons/src/lib/tabs/entities/tab-unselected-event';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export const TAB_HEADER_DATA = new InjectionToken<Tab>('TabHeaderData');
export const SIDE_HEADER_DATA = new InjectionToken<TabsSide>('SideHeaderData');

@Component({
  selector: 'lib-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnDestroy {
  public state: '' | 'selected';
  private selectedSubscription: Subscription;
  private unselectedSubscription: Subscription;

  constructor(
    @Inject(TAB_HEADER_DATA) public tab: Tab,
    @Inject(SIDE_HEADER_DATA) public side: TabsSide,
    private tabsService: TabsService,
    private eventBus: EventBusService,
  ) {
    this.state = tabsService.isSelected(this.tab) ? 'selected' : '';
    this.selectedSubscription = this.eventBus
      .of<TabSelectedEvent>(TabSelectedEvent.CHANNEL)
      .pipe(filter((event) => event.tab === this.tab))
      .subscribe(() => (this.state = 'selected'));
    this.unselectedSubscription = this.eventBus
      .of<TabUnselectedEvent>(TabUnselectedEvent.CHANNEL)
      .pipe(filter((event) => event.tab === this.tab))
      .subscribe(() => (this.state = ''));
  }

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
    this.unselectedSubscription.unsubscribe();
  }
}
