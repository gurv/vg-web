import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AboutModule } from './about/about.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StaticRoutingModule } from './static-routing.module';

@NgModule({
  imports: [AboutModule, SharedModule, StaticRoutingModule, DashboardModule]
})
export class StaticModule {}
