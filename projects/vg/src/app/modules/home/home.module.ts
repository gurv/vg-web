import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS } from './';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: []
})
export class HomeModule {}
