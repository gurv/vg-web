import { Directive, HostListener, Input } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';

@Directive({
  selector: '[libOpenHelp]',
})
export class OpenHelpDirective {
  @Input('libOpenHelp') page: HelpPageId;

  constructor(private eventBus: EventBusService) { }

  @HostListener('click') open() {
    this.eventBus.publish(new OpenHelpEvent(this.page));
  }
}
