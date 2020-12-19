import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { CurrencyListModule } from '../currency-list/currency-list.module';
import { CurrencyRateChartModule } from '../currency-rate-chart/currency-rate-chart.module';
import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [VendorsModule, CurrencyListModule, CurrencyRateChartModule],
  declarations: [CurrencyComponent],
  exports: [CurrencyComponent],
})
export class CurrencyModule {}
