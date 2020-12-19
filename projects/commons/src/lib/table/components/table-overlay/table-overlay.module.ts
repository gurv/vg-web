import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { MessageModule } from 'projects/commons/src/lib/message/components/message.module';
import { SpinnerModule } from 'projects/commons/src/lib/spinner/components/spinner/spinner.module';
import { TableOverlayComponent } from './table-overlay.component';

@NgModule({
  imports: [CommonModule, VendorsModule, SpinnerModule, MessageModule],
  declarations: [TableOverlayComponent],
  exports: [TableOverlayComponent],
})
export class TableOverlayModule {}
