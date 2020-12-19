import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { TabHeaderComponent } from './tab-header.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [TabHeaderComponent],
  exports: [TabHeaderComponent],
})
export class TabHeaderModule {}
