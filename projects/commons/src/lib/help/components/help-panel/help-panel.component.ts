import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HELP_PAGES } from 'projects/commons/src/lib/help/entities/help-pages';
import { HelpService } from 'projects/commons/src/lib/help/services/help/help.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { SplitPanesDragStart } from 'projects/commons/src/lib/split/entities/split-panes-drag-start';
import { SplitPanesDragStop } from 'projects/commons/src/lib/split/entities/split-panes-drag-stop';
import { Subscription } from 'rxjs';

library.add(faExternalLinkAlt);

@Component({
  selector: 'lib-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss'],
})
export class HelpPanelComponent implements OnDestroy {
  readonly newTabIcon = new IconFa(faExternalLinkAlt);

  pointerEvents = 'auto';
  subscriptions: Subscription[] = [];
  href: SafeUrl;
  src: SafeResourceUrl;

  constructor(
    public sanitizer: DomSanitizer,
    private configuration: ConfigurationService,
    eventBus: EventBusService,
    helpService: HelpService,
  ) {
    this.subscriptions.push(
      eventBus
        .of<SplitPanesDragStart>(SplitPanesDragStart.CHANNEL)
        .subscribe(() => (this.pointerEvents = 'none')),
    );
    this.subscriptions.push(
      eventBus
        .of<SplitPanesDragStop>(SplitPanesDragStop.CHANNEL)
        .subscribe(() => (this.pointerEvents = 'auto')),
    );
    this.subscriptions.push(helpService.lastPage.subscribe((pageId) => (this.page = pageId)));
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  set page(page: string) {
    const url = this.configuration.docUrl(HELP_PAGES[page]);
    this.href = this.sanitizer.bypassSecurityTrustUrl(url);
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
