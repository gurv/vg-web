import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { EventModule } from 'projects/commons/src/lib/event/event.module';
import { HelpModule } from 'projects/commons/src/lib/help/help.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { TabsModule } from 'projects/commons/src/lib/tabs/tabs.module';
import { NotificationsTableComponent } from './notifications-table.component';

@NgModule({
  imports: [CommonModule, VendorsModule, EventModule, TabsModule, HelpModule, IconModule],
  declarations: [NotificationsTableComponent],
  exports: [NotificationsTableComponent],
})
export class NotificationsTableModule {}
