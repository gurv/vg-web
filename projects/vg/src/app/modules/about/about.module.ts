import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AboutRoutingModule } from './about-routing.module';
import { COMPONENTS } from './';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    AboutRoutingModule,
    SharedModule
  ]
})
export class AboutModule {}
