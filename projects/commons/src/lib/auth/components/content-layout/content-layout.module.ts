import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ContentLayoutComponent } from './content-layout.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [ContentLayoutComponent],
  exports: [ContentLayoutComponent],
})
export class ContentLayoutModule {}
