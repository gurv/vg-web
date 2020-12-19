import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [WeatherDashboardComponent],
  exports: [WeatherDashboardComponent],
})
export class WeatherModule {}
