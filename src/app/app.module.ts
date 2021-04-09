import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { weatherReducer } from './reducers/weather.reducer';
import { WeatherComponent } from './weather/weather.component';
import { WeatherEffects } from './effects/weather.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherInputComponent } from './weather/weather-input/weather-input.component';

@NgModule({
  declarations: [AppComponent, WeatherComponent, WeatherInputComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ weathers: weatherReducer }),
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
