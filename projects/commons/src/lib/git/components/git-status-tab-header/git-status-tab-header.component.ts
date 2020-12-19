import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitStatus } from 'projects/commons/src/lib/git/entities/git-status';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { IconFaCounter } from 'projects/commons/src/lib/icon/entities/icon-fa-counter';
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
  selector: 'lib-git-status-tab-header',
  templateUrl: './git-status-tab-header.component.html',
  styleUrls: ['./git-status-tab-header.component.scss'],
})
export class GitStatusTabHeaderComponent extends TabHeaderComponent implements OnInit, OnDestroy {
  public icon: IconFaCounter;
  private gitSubscription: Subscription;

  constructor(
    @Inject(TAB_HEADER_DATA) tab: Tab,
    @Inject(SIDE_HEADER_DATA) side: TabsSide,
    tabsService: TabsService,
    eventBus: EventBusService,
    public gitCommandService: GitCommandService,
  ) {
    super(tab, side, tabsService, eventBus);
  }

  ngOnInit() {
    this.icon = new IconFaCounter(this.tab.icon as IconFa, '', 'info');
    this.gitSubscription = this.gitCommandService.statusSubject.subscribe((status: GitStatus) => {
      let count = 0;
      if (status) {
        count += status.unmerged.length;
        count += status.renamedCopied.length;
        count += status.changed.length;
        count += status.ignored.length;
        count += status.untracked.length;
      }
      count = Math.min(count, 99);
      this.icon.content = count.toString();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.gitSubscription.unsubscribe();
  }
}
