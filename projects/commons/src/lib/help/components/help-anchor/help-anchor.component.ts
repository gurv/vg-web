import { Component, Input, OnInit } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';

@Component({
  selector: 'lib-help-anchor',
  template: '',
})
export class HelpAnchorComponent implements OnInit {
  @Input() pageId: HelpPageId;

  constructor(private eventBus: EventBusService) { }

  ngOnInit() {
    this.eventBus.publish(new SelectHelpEvent(this.pageId));
  }
}
