import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "@app/shared";
import { CurrencyComponent } from './currency.component';
import { CurrencyRateChartComponent } from "@app/static/dashboard/currency/currency-rate-chart/currency-rate-chart.component";
import { CurrencyListComponent } from './currency-list/currency-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CurrencyComponent],
  declarations: [CurrencyComponent, CurrencyRateChartComponent, CurrencyListComponent]
})
export class CurrencyModule { }
