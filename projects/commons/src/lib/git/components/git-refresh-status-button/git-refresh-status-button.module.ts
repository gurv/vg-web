import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { GitRefreshStatusButtonComponent } from './git-refresh-status-button.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [GitRefreshStatusButtonComponent],
  exports: [GitRefreshStatusButtonComponent],
})
export class GitRefreshStatusButtonModule { }
