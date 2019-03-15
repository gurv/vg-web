import { Component, Input, OnInit } from '@angular/core';
import { OpenWeatherMapService } from './openweathermap/openweathermap.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: 'weather-dashboard.component.html',
  styleUrls: ['weather-dashboard.component.scss'],
  providers: [OpenWeatherMapService]
})
export class WeatherDashboardComponent implements OnInit {
  @Input() weather: number;
  constructor(private openWeatherMapService: OpenWeatherMapService) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.openWeatherMapService.getWeather().subscribe((weather) => {
      console.log('погода', weather);
      this.weather = weather.main.temp;
    });
  }
}
