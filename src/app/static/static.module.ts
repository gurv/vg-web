import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { DashboardModule } from '@app/static/dashboard/dashboard.module';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, DashboardModule],
  declarations: [AboutComponent]
})
export class StaticModule {}
