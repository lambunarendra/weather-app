import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherCallService {
	url = environment.weatherApiUrl;
  apiKey = environment.weatherApiKey;


  constructor(private http : HttpClient) { }

  getWeatherDataByCoords(lat, lon) {
  	let params = new HttpParams()
  	.set('lat', lat)
  	.set('lon', lon)
  	.set('units', 'metric')
  	.set('appid', this.apiKey)

    return this.http.get(this.url+'weather', { params });
  }

  getWeatherDataByCityName(city : string) {
  	let params = new HttpParams()
  	.set('q', city)
  	.set('units', 'metric')
  	.set('appid', this.apiKey)

  	return this.http.get(this.url+'weather', { params });
  }

  getWeatherForecast(lat, lon) {
	let params = new HttpParams()
	.set('lat', lat)
	.set('lon', lon)
	.set('units', 'metric')
	.set('appid', this.apiKey)

	return this.http.get(this.url+'onecall', { params });
  }
}
