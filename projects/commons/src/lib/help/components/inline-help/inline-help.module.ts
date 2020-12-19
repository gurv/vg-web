import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { InlineHelpComponent } from './inline-help.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [InlineHelpComponent],
  exports: [InlineHelpComponent],
})
export class InlineHelpModule { }
