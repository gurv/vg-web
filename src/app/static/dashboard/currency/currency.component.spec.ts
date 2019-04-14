import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyListComponent } from './currency-list/currency-list.component'
import { CurrencyRateChartComponent } from './currency-rate-chart/currency-rate-chart.component'

import { CurrencyComponent } from './currency.component';
import { from } from 'rxjs';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyComponent, CurrencyListComponent, CurrencyRateChartComponent],
      imports: [MatPaginatorModule, MatSidenavModule, MatTableModule, MatTabsModule, HttpClientTestingModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
