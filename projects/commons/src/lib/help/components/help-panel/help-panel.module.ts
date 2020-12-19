import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { HelpPanelComponent } from './help-panel.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [HelpPanelComponent],
  exports: [HelpPanelComponent],
})
export class HelpPanelModule { }
