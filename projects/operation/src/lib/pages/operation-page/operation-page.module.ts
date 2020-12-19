import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { OperationPageComponent } from './operation-page.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [OperationPageComponent],
  exports: [OperationPageComponent],
})
export class OperationPageModule {}
