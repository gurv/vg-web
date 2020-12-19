import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyRateChartComponent } from './currency-rate-chart.component';
import { CurrencyRateChartModule } from './currency-rate-chart.module';

describe('CurrencyRateChartComponent', () => {
  let component: CurrencyRateChartComponent;
  let fixture: ComponentFixture<CurrencyRateChartComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CurrencyRateChartModule, HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
