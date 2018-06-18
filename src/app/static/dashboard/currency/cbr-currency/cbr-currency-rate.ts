/**
 * Курс валюты Банка России
 */
export class CbrCurrencyRate {

  constructor(public cbrCurrencyId: string,
              public date: Date,
              public value: number) {
  }

}
