import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { EditorMessagesComponent } from './editor-messages.component';

@NgModule({
  imports: [CommonModule, VendorsModule, MessageModule],
  declarations: [EditorMessagesComponent],
  exports: [EditorMessagesComponent],
})
export class EditorMessagesModule {}
