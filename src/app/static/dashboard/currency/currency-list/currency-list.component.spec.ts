import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyListComponent } from './currency-list.component';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyListComponent],
      imports: [MatTableModule, MatPaginatorModule, HttpClientTestingModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
