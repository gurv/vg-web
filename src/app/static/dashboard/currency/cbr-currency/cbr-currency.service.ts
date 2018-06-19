/*
 Сервис валют Банка России

 источник данных: https://www.cbr.ru/scripts/Root.asp
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CbrCurrency} from './cbr-currency';
import { map ,  tap } from 'rxjs/operators';

interface Response {
  readonly text: string;
}

@Injectable()
export class CbrCurrencyService {

  private readonly url: string = '/scripts/XML_valFull.asp';

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<CbrCurrency[]> {
    return this.http
        .get(this.url)
        .pipe(
            map((response: HttpResponse<Response>) => this.parseXml(response.body.text)),
            tap((data: CbrCurrency[]) => console.log('Подготовлен список валют Банка России в количестве', data.length, 'шт.'))
        );
  }

  private parseXml(xml: string): CbrCurrency[] {

    const result: Array<CbrCurrency> = [];

    const parser = new DOMParser();
    const doc: XMLDocument = parser.parseFromString(xml, 'text/xml');

    const nodes: NodeListOf<Element> = doc.getElementsByTagName('Item');
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let id: string = nodes[i].getAttribute("ID");
        let name: string;
        let engName: string;
        let parentCode: string;
        let isoNumCode: string;
        let isoCharCode: string;
        let nominal: number = 0;

        let curNodes : NodeList = nodes[i].childNodes;
        for (let i = 0; i < curNodes.length; i++) {
          let curNode : Node = curNodes[i];
          if (curNode.childNodes.length == 0) {
            continue;
          }
          let valueNode : Node = curNode.childNodes[0];
          switch (curNode.nodeName) {
            case "Name":
              name = valueNode.nodeValue;
              break;
            case "EngName":
              engName = valueNode.nodeValue;
              break;
            case "ParentCode":
              parentCode = valueNode.nodeValue;
              break;
            case "ISO_Num_Code":
              isoNumCode = valueNode.nodeValue;
              break;
            case "ISO_Char_Code":
              isoCharCode = valueNode.nodeValue;
              break;
            case "Nominal":
              nominal = +valueNode.nodeValue.replace(',', '.');
              break;
          }
        }

        result.push(<CbrCurrency> {
          id: id,
          name: name,
          engName: engName,
          parentCode: parentCode,
          isoNumCode: isoNumCode,
          isoCharCode : isoCharCode,
          nominal: nominal
        });
      }
    }

    return result;
  }

}
