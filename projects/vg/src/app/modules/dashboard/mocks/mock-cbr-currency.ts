/**
 * Курсы валют Банка России
 */
import { ICbrCurrency } from '../models/cbr-currency';

export const CBR_CURRENCY_ARRAY = [
  { id: 'R01235', name: 'Доллар США', iso4217NumericCode: '840', nominal: 1 },
  { id: 'R01239', name: 'Евро', iso4217NumericCode: '978', nominal: 1 }
] as ICbrCurrency[];
