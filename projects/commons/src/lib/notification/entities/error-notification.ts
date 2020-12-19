import { Notification } from './notification';
import { NotificationLevel } from './notification-level';

export class ErrorNotification implements Notification {
  public readonly type = 'BaseNotification';

  constructor(
    public message: string,
    public level: NotificationLevel = NotificationLevel.ERROR,
    public trace?: string,
  ) {}
}
