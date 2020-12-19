import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { UploadMenuItemComponent } from './upload-menu-item.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [UploadMenuItemComponent],
  exports: [UploadMenuItemComponent],
})
export class UploadMenuItemModule {}
