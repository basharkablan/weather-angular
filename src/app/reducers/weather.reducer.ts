import * as WeatherActions from '../actions/weather.actions';
import { createReducer, on } from '@ngrx/store';
import { Weather } from '../models/weather.model';

const _weatherReducer = createReducer(
  [],
  on(
    WeatherActions.successWeatherAction,
    (state: Weather[], action): Weather[] => {
      return [...state, { ...action.weather }];
    }
  )
);

export function weatherReducer(
  state: Weather[],
  action: WeatherActions.All
): Weather[] {
  return _weatherReducer(state, action);
}
