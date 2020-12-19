import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitModule } from 'projects/commons/src/lib/split/split.module';
import { TabsModule } from 'projects/commons/src/lib/tabs/tabs.module';
import { SideSplitModule } from 'projects/commons/src/lib/workspaces/components/side-split/side-split.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { WorkspaceLayoutComponent } from './workspace-layout.component';

@NgModule({
  imports: [CommonModule, VendorsModule, TabsModule, SplitModule, SideSplitModule],
  declarations: [WorkspaceLayoutComponent],
  exports: [WorkspaceLayoutComponent],
})
export class WorkspaceLayoutModule { }
