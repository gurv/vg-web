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

  private url: string = '/scripts/XML_dynamic.asp';

  constructor(private http: HttpClient) {
  }

  getCurrencyRates(currency: CbrCurrency,
                   beginDate: Date,
                   endDate: Date): Observable<CbrCurrencyRate[]> {

    return this.http
      .get(this.url, {
        responseType: 'text'  as 'json', //TODO https://github.com/angular/angular/issues/18586
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

    let result : Array<CbrCurrencyRate> = [];

    let parser = new DOMParser();
    let doc: XMLDocument = parser.parseFromString(xml, "text/xml");

    let cbrCurrencyId: string = doc.documentElement.getAttribute("ID");

    let nodes : NodeListOf<Element> = doc.getElementsByTagName("Record");
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let node : Node = nodes[i];

        let rateDateString: string = node.attributes.getNamedItem("Date").value;
        let rateDate: Date = new Date(Date.UTC(
          Number(rateDateString.substring(6,10)),
          Number(rateDateString.substring(3,5)) - 1,
          Number(rateDateString.substring(0,2))
        ));
        let rateValue: number = 0;

        let rateNodes : NodeList = nodes[i].childNodes;
        for (let i = 0; i < rateNodes.length; i++) {
          let rateNode : Node = rateNodes[i];
          if (rateNode.childNodes.length == 0) {
            continue;
          }
          let valueNode : Node = rateNode.childNodes[0];
          switch (rateNode.nodeName) {
            case "Value":
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
