import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { HelpAnchorComponent } from './help-anchor.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [HelpAnchorComponent],
  exports: [HelpAnchorComponent],
})
export class HelpAnchorModule {}
