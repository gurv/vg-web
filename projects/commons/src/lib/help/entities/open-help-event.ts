import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { HelpEvent } from './help-event';
import { HelpPageId } from './help-page-id';

export class OpenHelpEvent extends BusEvent implements HelpEvent {
  public static readonly CHANNEL = 'open-help';

  constructor(public pageId: HelpPageId) {
    super(OpenHelpEvent.CHANNEL);
  }
}
