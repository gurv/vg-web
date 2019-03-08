import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { WeatherDashboardComponent } from './weather-dasshboard.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [WeatherDashboardComponent],
  declarations: [WeatherDashboardComponent]
})
export class WeatherModule {}
