import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Iso4217Currency } from '../iso4217-currency/iso4217-currency';
import { Iso4217CurrencyService } from '../iso4217-currency/iso4217-currency.service';

/**
 * Список курсов валют
 */
@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
  providers: [Iso4217CurrencyService]
})
export class CurrencyListComponent implements AfterViewInit {
  /**
   * Данные
   */
  dataSource = new MatTableDataSource<Iso4217Currency>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['alphabeticCode', 'numericCode', 'name'];
  constructor(private iso4217CurrencyService: Iso4217CurrencyService) {}

  ngAfterViewInit() {
    this.iso4217CurrencyService.getCurrencies().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }
}
