import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AboutComponent } from './about/about.component';
// FIXME не разобрался зачем это нужно здесь. См. коммент в about.component.ts
import { ToolchainComponent } from './about/toolchain/toolchain.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { StaticRoutingModule } from './static-routing.module';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, DashboardModule],
  declarations: [AboutComponent, ToolchainComponent]
})
export class StaticModule {}
