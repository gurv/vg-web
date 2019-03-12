import { NgModule } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from '../shared';
import { AboutComponent } from './about/about.component';
import { StaticRoutingModule } from './static-routing.module';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, DashboardModule],
  declarations: [AboutComponent]
})
export class StaticModule {}
