import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { CurrencyListComponent } from './currency-list.component';

@NgModule({
  imports: [VendorsModule],
  declarations: [CurrencyListComponent],
  exports: [CurrencyListComponent],
})
export class CurrencyListModule {}
