import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, SharedModule, CoreRoutingModule, HttpClientModule],
  declarations: [LoginComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
