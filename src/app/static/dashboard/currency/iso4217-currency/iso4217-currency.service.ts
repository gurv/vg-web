import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Iso4217Currency } from "app/static/dashboard/currency/iso4217-currency/iso4217-currency";

@Injectable()
export class Iso4217CurrencyService {

  private url: string = 'assets/data/iso-4217-currencies.json';
  constructor(
    private http: HttpClient
  ) {}

  getCurrencies(): Observable<Iso4217Currency[]> {
    return this.http
      .get<Iso4217Currency[]>(this.url)
  }
}
