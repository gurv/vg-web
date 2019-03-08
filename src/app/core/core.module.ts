import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CoreRoutingModule } from '@app/core/core-routing.module';
import { SharedModule } from '@app/shared';

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
