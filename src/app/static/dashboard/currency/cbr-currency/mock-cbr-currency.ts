/**
 * Курсы валют Банка России
 */
import { ICbrCurrency } from './cbr-currency';

export const CBR_CURRENCY_ARRAY: ICbrCurrency[] = [
  { id: 'R01235', name: 'Доллар США', iso4217NumericCode: '840', nominal: 1 } as ICbrCurrency,
  { id: 'R01239', name: 'Евро', iso4217NumericCode: '978', nominal: 1 } as ICbrCurrency
];
