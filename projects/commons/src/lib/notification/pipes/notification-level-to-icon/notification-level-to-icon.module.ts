import { NgModule } from '@angular/core';
import { NotificationLevelToIconPipe } from './notification-level-to-icon.pipe';

@NgModule({
  declarations: [NotificationLevelToIconPipe],
  exports: [NotificationLevelToIconPipe],
})
export class NotificationLevelToIconModule {}
