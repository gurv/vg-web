/*
 Сервис курсов валют Банка России

 источник данных: https://www.cbr.ru/scripts/Root.asp
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {CbrCurrencyRate} from "./cbr-currency-rate";
import {CbrCurrency} from "./cbr-currency";

interface Response {
  readonly text: string;
}

@Injectable()
export class CbrCurrencyRateService {

  private data: any;

  constructor(private http: HttpClient) {
  }

  getCurrencyRates(): Observable<any> {
    return this.http.get('/scripts/XML_daily.asp')
      .do(res => console.log("result: ", res))
      .do((res: HttpResponse<Response>) => console.log('parse: ', this.xml2CurrencyRates(res.body.text)))
      .map((data) =>
        this.data = data
      );
  }

  getCurrencyRatesByCurrencyAndDateRange(cbrCurrency: CbrCurrency,
                                         beginDate: Date,
                                         endDate: Date): Observable<any> {
    return this.http.get('/scripts/XML_dynamic.asp')
      .do(res => console.log("result: ", res))
      .do((res: HttpResponse<Response>) => console.log('parse: ', this.xml2CurrencyRates(res.body.text)))
      .map((data) =>
        this.data = data
      );
  }

  private xml2CurrencyRates(xml: string): any {
    let result : Array<CbrCurrencyRate> = [];

    let parser = new DOMParser();
    let doc: XMLDocument = parser.parseFromString(xml, "text/xml");

    let rateDateString: string = doc.documentElement.getAttribute("Date");
    let rateDate: Date = new Date(Date.UTC(
      Number(rateDateString.substring(6,10)),
      Number(rateDateString.substring(3,5)) - 1,
      Number(rateDateString.substring(0,2))
    ));

    let nodes : NodeListOf<Element> = doc.getElementsByTagName("Valute");
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let cbrCurrencyId: string = "TODO"; //TODO связать с...
        let value: number = 0;

        let rateNodes : NodeList = nodes[i].childNodes;
        for (let i = 0; i < rateNodes.length; i++) {
          let rateNode : Node = rateNodes[i];
          switch (rateNode.nodeName) {
            case "Value":
              value = +rateNode.childNodes[0].nodeValue.replace(',', '.');
              break;
          }
        }

        result.push(new CbrCurrencyRate(
          cbrCurrencyId,
          rateDate,
          value
        ));
      }
    }

    return result;
  }

}
