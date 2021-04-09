import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import * as WeatherActions from '../actions/weather.actions';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  addWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType<WeatherActions.AddWeather>(WeatherActions.ADD_WEATHER),
      mergeMap((action) =>
        this.weatherService
          .getWeather(action.weather.cityName, action.weather.units)
          .pipe(
            map((api_weather) =>
              WeatherActions.successWeatherAction({
                weather: {
                  cityName: api_weather.name,
                  units: action.weather.units,
                  description: api_weather.weather[0].description,
                  icon: api_weather.weather[0].icon,
                  temp: api_weather.main.temp,
                },
              })
            ),
            catchError(() => of(WeatherActions.failedWeatherAction()))
          )
      )
    )
  );
}
