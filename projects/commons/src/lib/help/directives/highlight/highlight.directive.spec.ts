import { fakeAsync, tick } from '@angular/core/testing';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';
import { HighlightService } from 'projects/commons/src/lib/help/services/highlight/highlight.service';
import { highlightServiceSpy } from 'projects/commons/src/lib/help/services/highlight/highlight.service.spec';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let highlightService: HighlightService;
  let eventBus: EventBusService;
  let directive: HighlightDirective;

  beforeEach(() => {
    highlightService = highlightServiceSpy();
    eventBus = eventBusSpy();
    directive = new HighlightDirective(highlightService, eventBus);
    directive.selector = 'selector';
    directive.duration = 1337;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should highlight', fakeAsync(() => {
    directive.highlight();

    expect(eventBus.publish).toHaveBeenCalledWith(directive.event);
    expect(highlightService.highlight).not.toHaveBeenCalled();

    tick(1);

    expect(highlightService.highlight).toHaveBeenCalledWith(directive.selector, 1337);
  }));

  it('should init event default', () => {
    directive.ngOnInit();

    expect(directive.event).toEqual(new BusEvent('noop'));
  });

  it('should init event channel', () => {
    directive.busEventChannel = 'test';
    directive.ngOnInit();

    expect(directive.event).toEqual(new BusEvent('test'));
  });

  it('should init event', () => {
    directive.busEvent = new OpenHelpEvent('HOME');
    directive.ngOnInit();

    expect(directive.event).toBe(directive.busEvent);
  });
});
