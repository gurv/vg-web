import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class ReconnectedEventSourceEvent extends BusEvent {
  public static readonly CHANNEL = 'reconnected-event-source-event';

  constructor() {
    super(ReconnectedEventSourceEvent.CHANNEL);
  }
}
