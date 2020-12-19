/**
 * Валюта Банка России
 */
export interface ICbrCurrency {
  id?: string;
  name?: string;
  engName?: string;
  parentCode?: string;
  isoNumCode?: string;
  isoCharCode?: string;
  iso4217NumericCode?: string;
  nominal?: number;
}
