import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { AuthLayoutModule } from './components/auth-layout/auth-layout.module';
import { BarModule } from './components/bar/bar.module';
import { ContentLayoutModule } from './components/content-layout/content-layout.module';
import { LoginPageModule } from './pages/login-page/login-page.module';

@NgModule({
  imports: [VendorsModule, AuthLayoutModule, BarModule, ContentLayoutModule, LoginPageModule],
  exports: [LoginPageModule],
})
export class AuthModule {}
