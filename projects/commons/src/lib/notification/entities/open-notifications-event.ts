import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class OpenNotificationsEvent extends BusEvent {
  public static readonly CHANNEL = 'open-notification';

  constructor() {
    super(OpenNotificationsEvent.CHANNEL);
  }
}
