import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { TabsModule } from 'projects/commons/src/lib/tabs/tabs.module';
import { SplitModule } from 'projects/commons/src/lib/split/split.module';
import { SideSplitComponent } from './side-split.component';

@NgModule({
  imports: [CommonModule, VendorsModule, TabsModule, SplitModule],
  declarations: [SideSplitComponent],
  exports: [SideSplitComponent],
})
export class SideSplitModule {}
