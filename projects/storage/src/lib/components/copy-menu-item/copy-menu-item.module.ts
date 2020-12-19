import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { CopyMenuItemComponent } from 'projects/storage/src/lib/components/copy-menu-item/copy-menu-item.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [CopyMenuItemComponent],
  exports: [CopyMenuItemComponent],
})
export class CopyMenuItemModule {}
