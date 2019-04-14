import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Iso4217CurrencyService } from './iso4217-currency.service';

describe('Iso4217CurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Iso4217CurrencyService]
    });
  });

  it('should be created', inject([Iso4217CurrencyService], (service: Iso4217CurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
