import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private static readonly API_KEY = '0d7303c17ee3d3482cd82a2ad273a90d';

  constructor(private http: HttpClient) {}

  getWeather(cityName: string, units: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${WeatherService.API_KEY}`
    );
  }
}
