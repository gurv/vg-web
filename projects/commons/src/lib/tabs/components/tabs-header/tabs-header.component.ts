import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { TabsAddedEvent } from 'projects/commons/src/lib/tabs/entities/tabs-added-event';
import { TabsContentInitializedEvent } from 'projects/commons/src/lib/tabs/entities/tabs-content-initialized-event';
import { TabsPosition } from 'projects/commons/src/lib/tabs/entities/tabs-position';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { WindowService } from 'projects/commons/src/lib/tools/services/window/window.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  SIDE_HEADER_DATA,
  TabHeaderComponent,
  TAB_HEADER_DATA
} from '../tab-header/tab-header.component';
import { TabsContentComponent } from '../tabs-content/tabs-content.component';

@Component({
  selector: 'lib-tabs-header',
  templateUrl: './tabs-header.component.html',
  styleUrls: ['./tabs-header.component.scss'],
})
export class TabsHeaderComponent implements OnInit, OnDestroy {
  @Input() tabs: Tab[];
  @Input() side: TabsSide;
  @Input() position: TabsPosition;
  content: TabsContentComponent;
  portals: ComponentPortal<TabHeaderComponent>[];

  private subscription: Subscription;

  constructor(
    private injector: Injector,
    private eventBus: EventBusService,
    private window: WindowService,
  ) {
    this.subscription = this.eventBus
      .of<TabsContentInitializedEvent>(TabsContentInitializedEvent.CHANNEL)
      .pipe(
        filter(
          (event) =>
            event.content.headerPosition === this.position &&
            event.content.headerSide === this.side,
        ),
      )
      .subscribe((event) => setTimeout(() => (this.content = event.content)));
  }

  ngOnInit() {
    this.eventBus.publish(new TabsAddedEvent(this.side, this.position));
    this.portals = _.map(
      this.tabs,
      (tab) =>
        new ComponentPortal(
          tab.headerComponentRef ? tab.headerComponentRef : TabHeaderComponent,
          null,
          Injector.create({
            providers: [
              { provide: TAB_HEADER_DATA, useValue: tab },
              { provide: SIDE_HEADER_DATA, useValue: this.side },
            ],
            parent: this.injector,
          }),
        ),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectTab(index: number) {
    const tab = this.tabs[index];
    if (this.content.selectedTab === tab) {
      this.content.unselectTab();
    } else {
      this.content.selectTab(index);
    }
    this.window.resizeNow();
  }
}
