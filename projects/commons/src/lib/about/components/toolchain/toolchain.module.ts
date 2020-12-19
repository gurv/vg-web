import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ToolchainComponent } from './toolchain.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [ToolchainComponent],
  exports: [ToolchainComponent],
})
export class ToolchainModule {}
