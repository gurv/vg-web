import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ToolchainModule } from './components/toolchain/toolchain.module';
import { AboutPageModule } from './pages/about-page/about-page.module';

@NgModule({
  imports: [VendorsModule, ToolchainModule, AboutPageModule],
  exports: [AboutPageModule],
})
export class AboutModule {}
