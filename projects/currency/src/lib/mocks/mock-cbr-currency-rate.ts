/**
 * Курсы валют Банка России
 */
import { CbrCurrencyRate } from '../entities/cbr-currency-rate';

export const CBR_CURRENCY_RATE_ARRAY: CbrCurrencyRate[] = [
  { cbrCurrencyId: 'R01235', date: new Date('25.11.2016'), value: 64.01 },
  { cbrCurrencyId: 'R01239', date: new Date('25.11.2016'), value: 68.02 },
];
