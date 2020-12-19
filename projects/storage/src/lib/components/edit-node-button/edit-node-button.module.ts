import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { EditNodeButtonComponent } from './edit-node-button.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [EditNodeButtonComponent],
  exports: [EditNodeButtonComponent],
})
export class EditNodeButtonModule {}
