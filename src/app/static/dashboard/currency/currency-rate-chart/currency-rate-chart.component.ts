import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { ICbrCurrency } from '../cbr-currency/cbr-currency';
import { CbrCurrencyRate } from '../cbr-currency/cbr-currency-rate';
import { CbrCurrencyRateDynamicService } from '../cbr-currency/cbr-currency-rate-dynamic.service';
import { CbrCurrencyService } from '../cbr-currency/cbr-currency.service';

@Component({
  selector: 'app-currency-rate-chart',
  templateUrl: 'currency-rate-chart.component.html',
  styleUrls: ['currency-rate-chart.component.scss'],
  providers: [CbrCurrencyService, CbrCurrencyRateDynamicService]
})
export class CurrencyRateChartComponent implements OnInit {
  readonly data;
  readonly currency: ICbrCurrency = {
    id: 'R01235',
    isoNumCode: '840',
    isoCharCode: 'USD',
    nominal: 1
  } as ICbrCurrency;
  beginDate: Date = new Date('2017-01-01');
  endDate: Date = new Date('2019-01-01');
  readonly currencies: ReadonlyArray<ICbrCurrency> = [
    { id: 'R01239', isoNumCode: '978', isoCharCode: 'EUR', nominal: 1 },
    { id: 'R01035', isoNumCode: '826', isoCharCode: 'GBP', nominal: 1 },
    { id: 'R01820', isoNumCode: '392', isoCharCode: 'JPY', nominal: 1 }
  ];
  columnChartOptions = {
    chartType: 'LineChart',
    dataTable: []
  };

  constructor(private cbrCurrencyRateDynamicService: CbrCurrencyRateDynamicService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    // Подготовка пакета запросов курсов валют
    const batch: Array<Observable<CbrCurrencyRate[]>> = [];
    for (const it of this.currencies) {
      batch.push(
        this.cbrCurrencyRateDynamicService.getCurrencyRates(it, this.beginDate, this.endDate)
      );
    }

    // Запрос и обработка курсов валют
    // FIXME data[i].length всегда 0
    zip.apply(null, batch).subscribe((data) => {
      // Таблица графика
      const chartTable: Array<Array<string | number>> = [];

      // Заполнение первой строки таблицы, которая содержит заголовок дат и валют
      const firstRow: string[] = [];
      firstRow.push('Дата');
      for (const it of data) {
        if (it.length > 0) {
          const idx: number = this.currencies.findIndex(
            (currency) => currency.id === it[0].cbrCurrencyId
          );
          firstRow.push(this.currencies[idx].isoCharCode);
        }
      }
      chartTable.push(firstRow);

      // Заполнение таблицы данными курсов валют
      if (data.length > 0) {
        for (let r = 0; r < data[0].length; r++) {
          const row: Array<string | number> = [];
          for (let c = 0; c < data.length; c++) {
            const rate: CbrCurrencyRate = data[c][r];
            if (c === 0) {
              row.push(rate.date.toLocaleDateString());
            }
            row.push(rate.value);
          }
          chartTable.push(row);
        }
      }
      console.log('Подготовлена таблица данных графика курсов валют');

      this.columnChartOptions = Object.create(this.columnChartOptions);
      this.columnChartOptions.dataTable = chartTable;
    });
  }
}
