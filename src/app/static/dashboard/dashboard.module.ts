import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CurrencyModule } from './currency/currency.module';
import { MapModule } from './map/map.module';
import { OperationModule } from './operation/operation.module';
import { ToolchainModule } from './toolchain/toolchain.module';
import { WeatherModule } from './weather/weather.module';
import { DashboardComponent } from './dashboard.component';

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
