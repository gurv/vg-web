import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { NewDirectoryMenuItemComponent } from './new-directory-menu-item.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [NewDirectoryMenuItemComponent],
  exports: [NewDirectoryMenuItemComponent],
})
export class NewDirectoryMenuItemModule {}
