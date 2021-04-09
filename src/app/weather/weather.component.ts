import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherState } from '../interfaces/weather-state.interface';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  weathers$: Observable<Weather[]>;

  constructor(private store: Store<WeatherState>) {
    this.weathers$ = this.store.select('weathers');
  }
}
