import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class ReloadEventSourceEvent extends BusEvent {
  public static readonly CHANNEL = 'reload-event-source-event';

  constructor() {
    super(ReloadEventSourceEvent.CHANNEL);
  }
}
