import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { EventModule } from 'projects/commons/src/lib/event/event.module';
// import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { TabHeaderModule } from './components/tab-header/tab-header.module';
import { TabsHeaderModule } from './components/tabs-header/tabs-header.module';
import { TabsContentModule } from './components/tabs-content/tabs-content.module';
// import { ToolsModule } from 'projects/commons/src/lib/tools/tools.module';
// import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';

@NgModule({
  // imports: [CommonModule, VendorsModule, EventModule, ToolsModule, IconModule],
  imports: [CommonModule, TabHeaderModule, TabsHeaderModule, TabsContentModule],
  exports: [TabsHeaderModule, TabsContentModule],
})
export class TabsModule {}
