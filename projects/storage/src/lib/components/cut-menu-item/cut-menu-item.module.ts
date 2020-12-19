import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { CutMenuItemComponent } from 'projects/storage/src/lib/components/cut-menu-item/cut-menu-item.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [CutMenuItemComponent],
  exports: [CutMenuItemComponent],
})
export class CutMenuItemModule {}
