import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { SpinnerModule } from 'projects/commons/src/lib/spinner/components/spinner/spinner.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule, SpinnerModule],
  declarations: [MessageComponent],
  exports: [MessageComponent],
})
export class MessageModule {}
