/**
 * Валюта Банка России
 */
export interface CbrCurrency {

  id?: string;
  name?: string;
  engName?: string;
  parentCode?: string;
  isoNumCode?: string;
  isoCharCode?: string;
  iso4217NumericCode?: string;
  nominal?: number;

}
