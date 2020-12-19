import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { CodeDiffComponent } from './code-diff.component';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';

@NgModule({
  imports: [CommonModule, VendorsModule, HelpAnchorModule],
  declarations: [CodeDiffComponent],
  exports: [CodeDiffComponent],
})
export class CodeDiffModule {}
