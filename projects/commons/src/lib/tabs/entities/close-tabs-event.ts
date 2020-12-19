import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class CloseTabsEvent extends BusEvent {
  public static readonly CHANNEL = 'close-tabs';

  constructor() {
    super(CloseTabsEvent.CHANNEL);
  }
}
