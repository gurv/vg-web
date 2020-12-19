import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { NotificationsTabHeaderComponent } from './notifications-tab-header.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [NotificationsTabHeaderComponent],
  exports: [NotificationsTabHeaderComponent],
})
export class NotificationsTabHeaderModule {}
