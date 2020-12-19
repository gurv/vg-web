import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { TabsHeaderComponent } from './tabs-header.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [TabsHeaderComponent],
  exports: [TabsHeaderComponent],
})
export class TabsHeaderModule {}
