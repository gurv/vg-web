import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { GitFileStatusTableComponent } from './git-file-status-table.component';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { XyToStatusModule } from '../../pipes/xy-to-status/xy-to-status.module';
import { XyToColorModule } from '../../pipes/xy-to-color/xy-to-color.module';
import { ColorToTextClassModule } from 'projects/commons/src/lib/color/pipes/color-to-text-class/color-to-text-class.module';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    MessageModule,
    XyToStatusModule,
    XyToColorModule,
    ColorToTextClassModule,
  ],
  declarations: [GitFileStatusTableComponent],
  exports: [GitFileStatusTableComponent],
})
export class GitFileStatusTableModule {}
