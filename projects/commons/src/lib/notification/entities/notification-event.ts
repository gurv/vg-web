import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { Notification } from './notification';

export class NotificationEvent extends BusEvent {
  public static readonly CHANNEL = 'notification';

  constructor(public notification: Notification) {
    super(NotificationEvent.CHANNEL);
  }
}
