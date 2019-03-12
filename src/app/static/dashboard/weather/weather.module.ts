import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { WeatherDashboardComponent } from './weather-dasshboard.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [WeatherDashboardComponent],
  declarations: [WeatherDashboardComponent]
})
export class WeatherModule {}
