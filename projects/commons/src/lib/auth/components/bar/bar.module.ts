import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { BarComponent } from './bar.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [BarComponent],
  exports: [BarComponent],
})
export class BarModule {}
