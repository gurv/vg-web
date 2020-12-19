import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsTabHeaderModule } from './components/notifications-tab-header/notifications-tab-header.module';
import { NotificationsTableModule } from './components/notifications-table/notifications-table.module';
import { NotificationLevelToIconModule } from './pipes/notification-level-to-icon/notification-level-to-icon.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsTabHeaderModule,
    NotificationsTableModule,
    NotificationLevelToIconModule,
  ],
  exports: [NotificationsTabHeaderModule, NotificationsTableModule],
})
export class NotificationModule {}
