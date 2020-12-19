import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { GitStatusComponent } from './git-status.component';

@NgModule({
  imports: [CommonModule, VendorsModule, MessageModule],
  declarations: [GitStatusComponent],
  exports: [GitStatusComponent],
})
export class GitStatusModule {}
