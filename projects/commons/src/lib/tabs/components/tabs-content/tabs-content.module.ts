import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { TabsContentComponent } from './tabs-content.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [TabsContentComponent],
  exports: [TabsContentComponent],
})
export class TabsContentModule {}
