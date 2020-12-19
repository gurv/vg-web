import { NotificationLevel } from './notification-level';

export interface Notification {
  message: string;
  level: NotificationLevel;
  type: string;
}
