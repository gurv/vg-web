/*
 Сервис валют Банка России

 источник данных: https://www.cbr.ru/scripts/Root.asp
 */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CbrCurrency } from './cbr-currency';

interface Response {
  readonly text: string;
}

@Injectable()
export class CbrCurrencyService {
  private readonly url: string = '/scripts/XML_valFull.asp';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<CbrCurrency[]> {
    return this.http.get(this.url).pipe(
      map((response: HttpResponse<Response>) => this.parseXml(response.body.text)),
      tap((data: CbrCurrency[]) =>
        console.log('Подготовлен список валют Банка России в количестве', data.length, 'шт.')
      )
    );
  }

  private parseXml(xml: string): CbrCurrency[] {
    const result: CbrCurrency[] = [];

    const parser = new DOMParser();
    const doc: XMLDocument = parser.parseFromString(xml, 'text/xml');

    const nodes: HTMLCollectionOf<Element> = doc.getElementsByTagName('Item');
    if (nodes) {
      for (const node of nodes) {
        const id: string = node.getAttribute('ID');
        let name: string;
        let engName: string;
        let parentCode: string;
        let isoNumCode: string;
        let isoCharCode: string;
        let nominal = 0;

        const curNodes: NodeList = node.childNodes;
        for (const curNode of curNodes) {
          if (curNode.childNodes.length === 0) {
            continue;
          }
          const valueNode: Node = curNode.childNodes[0];
          switch (curNode.nodeName) {
            case 'Name':
              name = valueNode.nodeValue;
              break;
            case 'EngName':
              engName = valueNode.nodeValue;
              break;
            case 'ParentCode':
              parentCode = valueNode.nodeValue;
              break;
            case 'ISO_Num_Code':
              isoNumCode = valueNode.nodeValue;
              break;
            case 'ISO_Char_Code':
              isoCharCode = valueNode.nodeValue;
              break;
            case 'Nominal':
              nominal = +valueNode.nodeValue.replace(',', '.');
              break;
          }
        }

        result.push({
          id,
          name,
          engName,
          parentCode,
          isoNumCode,
          isoCharCode,
          nominal
        } as CbrCurrency);
      }
    }

    return result;
  }
}
