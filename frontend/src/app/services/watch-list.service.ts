import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityWeather } from '../model/cityWeather/CityWeather';


@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  baseServerUrl = environment.apiUrl;
  apiEnabled = environment.apiEnabled;
  constructor(private http:HttpClient) {
    
  }

  addWeather(data:CityWeather){
   const userName:String=Cookie.get('user');
    const temp ={userName,...data};
    return this.http.post<CityWeather>(`${this.baseServerUrl}/WatchList/add`,temp);
  }

  getWeather():Observable<CityWeather[]>{
    const userName:string=Cookie.get('user');
    return this.http.get<CityWeather[]>(`${this.baseServerUrl}/WatchList/cityList/${userName}`);
  }

  removeWeather(cityname:string,userName:string,country:string){
    return this.http.delete(`${this.baseServerUrl}/WatchList/remove/${cityname}/${userName}/${country}`);
  }

}
