import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HighlightService } from 'projects/commons/src/lib/help/services/highlight/highlight.service';

@Directive({
  selector: '[libHighlightOver]',
})
export class HighlightOverDirective implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appHighlightOver') selector: string;
  @Input() busEventChannel?: string;
  @Input() busEvent?: BusEvent;
  @Input() duration?: number;
  highlighted = false;
  event: BusEvent;

  constructor(private highlightService: HighlightService, private eventBus: EventBusService) { }

  @HostListener('mousemove') highlight() {
    if (this.highlighted) {
      return;
    }
    this.highlighted = true;
    this.eventBus.publish(this.event);
    setTimeout(() => {
      this.highlightService.highlight(this.selector, this.duration);
      setTimeout(() => (this.highlighted = false), 3000);
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
