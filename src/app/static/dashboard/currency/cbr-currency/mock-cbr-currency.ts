/**
 * Курсы валют Банка России
 */
import {CbrCurrency} from './cbr-currency';

export const CBR_CURRENCY_ARRAY: CbrCurrency[] = [
  <CbrCurrency> {id: 'R01235', name: 'Доллар США', iso4217NumericCode: '840', nominal: 1},
  <CbrCurrency> {id: 'R01239', name: 'Евро', iso4217NumericCode: '978', nominal: 1}
];
