import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [AuthLayoutComponent],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
