import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CurrencyModule } from './currency/currency.module';
import { DashboardComponent } from './dashboard.component';
import { MapModule } from './map/map.module';
import { WeatherModule } from './weather/weather.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MapModule,
    CurrencyModule,
    WeatherModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
