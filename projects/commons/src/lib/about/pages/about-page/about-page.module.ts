import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { AboutPageComponent } from './about-page.component';
import { ToolchainModule } from 'projects/commons/src/lib/about/components/toolchain/toolchain.module';

@NgModule({
  imports: [VendorsModule, ToolchainModule],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent],
})
export class AboutPageModule {}
