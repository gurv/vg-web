/*
 Сервис курсов валют Банка России

 источник данных: https://www.cbr.ru/scripts/Root.asp
 */

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ICbrCurrency } from '../models/cbr-currency';
import { CbrCurrencyRate } from '../models/cbr-currency-rate';

interface IResponse {
  readonly text: string;
}

@Injectable()
export class CbrCurrencyRateService {
  private data: any;

  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<any> {
    return this.http.get('/scripts/XML_daily.asp').pipe(
      tap((res) => console.log('result: ', res)),
      tap((res: HttpResponse<IResponse>) =>
        console.log('parse: ', this.xml2CurrencyRates(res.body.text))
      )
      /*
        .map((data) =>
            this.data = data
*/
    );
  }

  getCurrencyRatesByCurrencyAndDateRange(
    cbrCurrency: ICbrCurrency,
    beginDate: Date,
    endDate: Date
  ): Observable<any> {
    return this.http.get('/scripts/XML_dynamic.asp').pipe(
      tap((res) => console.log('result: ', res)),
      tap((res: HttpResponse<IResponse>) =>
        console.log('parse: ', this.xml2CurrencyRates(res.body.text))
      )
    );
  }

  private xml2CurrencyRates(xml: string): any {
    const result: CbrCurrencyRate[] = [];

    const parser = new DOMParser();
    const doc: XMLDocument = parser.parseFromString(xml, 'text/xml');

    const rateDateString: string = doc.documentElement.getAttribute('Date');
    const rateDate: Date = new Date(
      Date.UTC(
        Number(rateDateString.substring(6, 10)),
        Number(rateDateString.substring(3, 5)) - 1,
        Number(rateDateString.substring(0, 2))
      )
    );

    const nodes: HTMLCollectionOf<Element> = doc.getElementsByTagName('Valute');
    if (nodes) {
      for (const node of nodes) {
        const cbrCurrencyId = 'TODO'; // TODO связать с...
        let value = 0;

        const rateNodes: NodeList = node.childNodes;
        for (const rateNode of rateNodes) {
          switch (rateNode.nodeName) {
            case 'Value':
              value = +rateNode.childNodes[0].nodeValue.replace(',', '.');
              break;
          }
        }

        result.push(new CbrCurrencyRate(cbrCurrencyId, rateDate, value));
      }
    }

    return result;
  }
}
