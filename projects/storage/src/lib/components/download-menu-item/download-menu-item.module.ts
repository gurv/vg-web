import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { DownloadMenuItemComponent } from './download-menu-item.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [DownloadMenuItemComponent],
  exports: [DownloadMenuItemComponent],
})
export class DownloadMenuItemModule {}
