import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../interfaces/weather-state.interface';
import { Weather } from '../../models/weather.model';
import * as WeatherActions from '../../actions/weather.actions';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-weather-input',
  templateUrl: './weather-input.component.html',
  styleUrls: ['./weather-input.component.css'],
})
export class WeatherInputComponent implements OnInit {
  @Input() weather: Weather;
  weatherInputForm: FormGroup;

  submitted: boolean = false;

  citiesList: string[] = ['Kyiv', 'Tel Aviv', 'Haifa'];

  constructor(private store: Store<WeatherState>) {}

  ngOnInit() {
    if (this.weather) {
      this.weatherInputForm = new FormGroup({
        city: new FormControl(this.weather.cityName, [
          Validators.required,
          this.isValidCity,
        ]),
        units: new FormControl(this.weather.units, [
          Validators.required,
          this.isValidUnit,
        ]),
      });
    } else {
      this.weatherInputForm = new FormGroup({
        city: new FormControl('-1', [Validators.required, this.isValidCity]),
        units: new FormControl('', [Validators.required, this.isValidUnit]),
      });
    }
  }

  onSubmit(weatherInputForm: FormGroup) {
    this.submitted = true;

    if (weatherInputForm.valid) {
      this.addWeather(
        weatherInputForm.controls.city.value,
        weatherInputForm.controls.units.value
      );
      this.weatherInputForm = new FormGroup({
        city: new FormControl('-1', [Validators.required, this.isValidCity]),
        units: new FormControl('', [Validators.required, this.isValidUnit]),
      });
      this.submitted = false;
    }
  }

  addWeather(cityName: string, units: string) {
    this.store.dispatch(
      WeatherActions.addWeatherAction({ weather: { cityName, units } })
    );
  }

  // city validation
  isValidCity(control: AbstractControl): { [key: string]: any } {
    if (control.value != '-1') {
      return null;
    }
    return { isValidUnit: false };
  }

  // units validation
  isValidUnit(control: AbstractControl): { [key: string]: any } {
    if (typeof control.value === 'string') {
      let value = control.value.toLocaleLowerCase();

      if (value == 'standard' || value == 'imperial' || value == 'metric') {
        return null;
      }
    }

    return { isValidUnit: false };
  }
}
