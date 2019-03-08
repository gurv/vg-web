import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared';
import { ToolchainModule } from '@app/static/dashboard/toolchain/toolchain.module';
import { MapModule } from '@app/static/dashboard/map/map.module';
import { CurrencyModule } from '@app/static/dashboard/currency/currency.module';
import { WeatherModule } from '@app/static/dashboard/weather/weather.module';
import { OperationModule } from '@app/static/dashboard/operation/operation.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToolchainModule,
    MapModule,
    CurrencyModule,
    WeatherModule,
    OperationModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
