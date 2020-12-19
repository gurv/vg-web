import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { SshPublicKeyComponent } from './ssh-public-key.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule, MessageModule],
  declarations: [SshPublicKeyComponent],
  exports: [SshPublicKeyComponent],
})
export class SshPublicKeyModule {}
