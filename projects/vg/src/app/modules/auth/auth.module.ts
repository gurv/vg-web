import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { COMPONENTS } from './';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
