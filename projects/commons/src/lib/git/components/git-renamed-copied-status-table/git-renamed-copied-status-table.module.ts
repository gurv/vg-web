import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorToTextClassModule } from 'projects/commons/src/lib/color/pipes/color-to-text-class/color-to-text-class.module';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { XyToStatusModule } from '../../pipes/xy-to-status/xy-to-status.module';
import { XyToColorModule } from '../../pipes/xy-to-color/xy-to-color.module';
import { GitRenamedCopiedStatusTableComponent } from './git-renamed-copied-status-table.component';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    MessageModule,
    XyToStatusModule,
    XyToColorModule,
    ColorToTextClassModule,
  ],
  declarations: [GitRenamedCopiedStatusTableComponent],
  exports: [GitRenamedCopiedStatusTableComponent],
})
export class GitRenamedCopiedStatusTableModule {}
