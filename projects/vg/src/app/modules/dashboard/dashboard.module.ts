import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { COMPONENTS } from './';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDnwc-bUtWYikIiFN0RrkWC7unt3LpS9hg'
    }),
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
