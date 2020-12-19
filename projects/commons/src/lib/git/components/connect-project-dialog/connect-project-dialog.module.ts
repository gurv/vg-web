import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { SshPublicKeyModule } from '../ssh-public-key/ssh-public-key.module';
import { ConnectProjectDialogComponent } from './connect-project-dialog.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule, HelpAnchorModule, SshPublicKeyModule],
  declarations: [ConnectProjectDialogComponent],
  exports: [ConnectProjectDialogComponent],
})
export class ConnectProjectDialogModule { }
