import { Action, createAction, props } from '@ngrx/store';
import { Weather, WeatherInput } from '../models/weather.model';

export const ADD_WEATHER = '[Weather] Add Weather';
export const SUCCESS_WEATHER = '[Weather API] Weather Loaded Success';
export const FAILED_WEATHER = '[Weather API] Weather Loaded Error';

export const addWeatherAction = createAction(
  ADD_WEATHER,
  props<{ weather: WeatherInput }>()
);

export const successWeatherAction = createAction(
  SUCCESS_WEATHER,
  props<{ weather: Weather }>()
);

export const failedWeatherAction = createAction(FAILED_WEATHER);

export class AddWeather implements Action {
  readonly type = ADD_WEATHER;

  constructor(public weather: WeatherInput) {}
}

export class SuccessWeather implements Action {
  readonly type = SUCCESS_WEATHER;

  constructor(public weather: Weather) {}
}

export class FailedWeather implements Action {
  readonly type = FAILED_WEATHER;
}

export type All =
  | typeof addWeatherAction
  | typeof successWeatherAction
  | typeof failedWeatherAction;
