import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { NotificationLevel } from './notification-level';
import { Notification } from './notification';

export class BaseNotification implements Notification {
  public readonly type = 'BaseNotification';

  constructor(
    public message: string,
    public level: NotificationLevel = NotificationLevel.INFO,
    public helpPage?: HelpPageId,
    public highlight?: {
      selector: string;
      busEvent: BusEvent;
    },
  ) {}
}
