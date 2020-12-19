import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';
import { OpenHelpDirective } from './open-help.directive';

describe('OpenHelpDirective', () => {
  it('should fire event on click', () => {
    const eventBus = eventBusSpy();
    const directive = new OpenHelpDirective(eventBus);

    expect(directive).toBeTruthy();

    directive.page = 'HOME';
    directive.open();

    expect(eventBus.publish).toHaveBeenCalledWith(new OpenHelpEvent('HOME'));
  });
});
