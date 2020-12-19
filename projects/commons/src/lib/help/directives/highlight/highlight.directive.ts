import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HighlightService } from 'projects/commons/src/lib/help/services/highlight/highlight.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[libHighlight]',
})
export class HighlightDirective implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('libHighlight') selector: string;
  @Input() busEventChannel?: string;
  @Input() busEvent?: BusEvent;
  @Input() duration?: number;
  event: BusEvent;

  constructor(private highlightService: HighlightService, private eventBus: EventBusService) { }

  @HostListener('click') highlight() {
    this.eventBus.publish(this.event);
    setTimeout(() => {
      this.highlightService.highlight(this.selector, this.duration);
    });
  }

  ngOnInit() {
    if (this.busEvent) {
      this.event = this.busEvent;
    } else if (this.busEventChannel) {
      this.event = new BusEvent(this.busEventChannel);
    } else {
      this.event = new BusEvent('noop');
    }
  }
}
