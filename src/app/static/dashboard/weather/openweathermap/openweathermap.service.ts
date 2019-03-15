/*
 Сервис погоды

 источник данных: http://openweathermap.org/current

 gurv\!qazxsw2
 vladimir.gurinovich@gmail.com
 b32189efe001e9dd2cb10a1503fa6827
 https://mail.google.com/mail/u/0/#inbox/15941ca4687e6c5c
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OpenWeatherMapService {
  private url = '/data/2.5/weather';
  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get(this.url, {
      params: new HttpParams()
        .set('APPID', 'b32189efe001e9dd2cb10a1503fa6827')
        .set('units', 'metric')
        .set('lat', String(55))
        .set('lon', String(37))
    });
  }
}
