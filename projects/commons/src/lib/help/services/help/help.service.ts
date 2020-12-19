import { Injectable, OnDestroy } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HelpEvent } from 'projects/commons/src/lib/help/entities/help-event';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HelpService implements OnDestroy {
  lastPage: BehaviorSubject<HelpPageId>;

  private subscription: Subscription;

  constructor(eventBus: EventBusService) {
    this.lastPage = new BehaviorSubject<HelpPageId>('HOME');
    this.subscription = eventBus
      .of<HelpEvent>(OpenHelpEvent.CHANNEL, SelectHelpEvent.CHANNEL)
      .pipe(filter((event) => !!event.pageId))
      .subscribe((event) => {
        this.lastPage.next(event.pageId);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
