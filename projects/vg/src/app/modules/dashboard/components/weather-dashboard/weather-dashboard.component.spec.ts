import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WeatherDashboardComponent } from './weather-dashboard.component';
import { OpenWeatherMapService } from '../../services/openweathermap.service';

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let mockOpenWeatherMapService: OpenWeatherMapService;

  beforeEach(waitForAsync(() => {
    mockOpenWeatherMapService = jasmine.createSpyObj(['getCustomer']);
    TestBed.configureTestingModule({
      declarations: [WeatherDashboardComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: OpenWeatherMapService, useValue: mockOpenWeatherMapService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
