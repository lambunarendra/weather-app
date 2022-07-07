import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CityWeather } from '../../model/cityWeather/CityWeather';

import { WatchListService } from '../../services/watch-list.service';

@Component({
  selector: 'app-list-cities-weather',
  templateUrl: './list-cities-weather.component.html',
  styleUrls: ['./list-cities-weather.component.css']
})
export class ListCitiesWeatherComponent implements OnInit {

  citiesWeather: CityWeather[]=[
    {"cityId":1269843,"name":"Pune","temperature":{"feelsLike":37,"humidity":34,"pressure":1006,"tempMax":37,"tempMin":36,"temp":36},"coord":{"longitude":78.4744,"latitude":17.3753},"visibility":6000,"weather":{"description":"scattered clouds","mainInfo":"Clouds"},"country":"IN"},//
    {"cityId":1269843,"name":"Hyderabad","temperature":{"feelsLike":37,"humidity":34,"pressure":1006,"tempMax":37,"tempMin":36,"temp":36},"coord":{"longitude":78.4744,"latitude":17.3753},"visibility":6000,"weather":{"description":"scattered clouds","mainInfo":"Clouds"},"country":"IN"}//

]; 
  flag = false;
  path: string = `city-weather/${localStorage.getItem('currentCity')}/null`;

 

  constructor(private service: WatchListService, private router: Router) { }

  ngOnInit(): void {
    this.getWeather()
  }


  getWeather() {
    this.service.getWeather().subscribe((data: CityWeather[]) => {
      this.citiesWeather = data;
      console.log(data)
    });
  }

  onDelete(cityname: string, country: string) {
    const userName =Cookie.get('user'); 

    const obser = {
      next: (data: CityWeather[]) => {
        this.getWeather();
        this.flag = true;
        setInterval(() => {
          this.flag = false
        }, 2000);
      },
      error: (err: Error) => {
        console.log(err.message);
      }
    }
    const observer = this.service.removeWeather(cityname, userName, country);

    observer.subscribe(obser);
  }

  goHome() {
    this.router.navigate(['']);
  }

}
