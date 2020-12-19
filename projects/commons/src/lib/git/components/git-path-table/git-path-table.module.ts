import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { GitPathTableComponent } from './git-path-table.component';

@NgModule({
  imports: [CommonModule, VendorsModule, MessageModule],
  declarations: [GitPathTableComponent],
  exports: [GitPathTableComponent],
})
export class GitPathTableModule {}
