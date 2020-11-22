import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyRateChartComponent } from './currency-rate-chart/currency-rate-chart.component';
import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [CurrencyComponent],
  declarations: [CurrencyComponent, CurrencyRateChartComponent, CurrencyListComponent]
})
export class CurrencyModule {}
