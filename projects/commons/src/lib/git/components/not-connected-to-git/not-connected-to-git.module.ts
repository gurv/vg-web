import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { NotConnectedToGitComponent } from './not-connected-to-git.component';

@NgModule({
  imports: [CommonModule, VendorsModule, MessageModule],
  declarations: [NotConnectedToGitComponent],
  exports: [NotConnectedToGitComponent],
})
export class NotConnectedToGitModule {}
