import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { GitStatusTabHeaderComponent } from './git-status-tab-header.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [GitStatusTabHeaderComponent],
  exports: [GitStatusTabHeaderComponent],
})
export class GitStatusTabHeaderModule { }
