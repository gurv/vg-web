/*
 Сервис динамики курса валюты Банка России

 источник данных: https://www.cbr.ru/scripts/Root.asp
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CbrCurrencyRate} from './cbr-currency-rate';
import {CbrCurrency} from './cbr-currency';
import { map ,  tap } from 'rxjs/operators';

@Injectable()
export class CbrCurrencyRateDynamicService {

  private url = '/scripts/XML_dynamic.asp';

  constructor(private http: HttpClient) {
  }

  getCurrencyRates(currency: CbrCurrency,
                   beginDate: Date,
                   endDate: Date): Observable<CbrCurrencyRate[]> {

    return this.http
      .get(this.url, {
        responseType: 'text'  as 'json', // TODO https://github.com/angular/angular/issues/18586
        params : new HttpParams()
          .set('date_req1', this.dateToString(beginDate))
          .set('date_req2', this.dateToString(endDate))
          .set('VAL_NM_RQ', currency.id)
      })
      .pipe(
        map((response: string) =>
          this.parseXml(response)
        ),
        tap((data: CbrCurrencyRate[]) =>
          console.log('Подготовлен список курсов Банка России валюты', currency.isoCharCode, 'в количестве', data.length, 'шт.')
        )
      );
  }

  private dateToString(date: Date): string {
    return date.toLocaleDateString().replace('.', '/');
  }

  private parseXml(xml: string): CbrCurrencyRate[] {

    const result: Array<CbrCurrencyRate> = [];

    const parser = new DOMParser();
    const doc: XMLDocument = parser.parseFromString(xml, 'text/xml');

    const cbrCurrencyId: string = doc.documentElement.getAttribute('ID');

    const nodes: NodeListOf<Element> = doc.getElementsByTagName('Record');
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node: Node = nodes[i];

        const rateDateString: string = node.attributes.getNamedItem('Date').value;
        const rateDate: Date = new Date(Date.UTC(
          Number(rateDateString.substring(6, 10)),
          Number(rateDateString.substring(3, 5)) - 1,
          Number(rateDateString.substring(0, 2))
        ));
        let rateValue = 0;

        const rateNodes: NodeList = nodes[i].childNodes;
        for (let i2 = 0; i2 < rateNodes.length; i2++) {
          const rateNode: Node = rateNodes[i2];
          if (rateNode.childNodes.length === 0) {
            continue;
          }
          const valueNode: Node = rateNode.childNodes[0];
          switch (rateNode.nodeName) {
            case 'Value':
              rateValue = +valueNode.nodeValue.replace(',', '.');
              break;
          }
        }

        result.push(new CbrCurrencyRate(
          cbrCurrencyId,
          rateDate,
          rateValue
        ));
      }
    }

    return result;
  }

}