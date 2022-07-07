
import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { CityWeather } from 'src/app/model/cityWeather/CityWeather';
import { WeatherCallService } from 'src/app/services/weather-call.service';
import { WatchListService } from 'src/app/services/watch-list.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  weatherData : any = {};
  weatherForecast: any = {};
  wishlist : any = {};
  coords: Icoords;
  moreInfo: boolean = false;
  showForecast: boolean = false;
  moreInfoText: string = 'Show More Info';
  forecastText: string = 'Show Forecast';
  sunrise_time : any;
  sunset_time : any;
  flag: boolean = true;

  flag1:boolean=false;
  cityWeather: CityWeather;
  alreadyflag= false;
  user_name:String='';

  constructor(private authService:AuthService,private weatherService : WeatherCallService,private watchlistService : WatchListService) { }

  ngOnInit(): void{
    this.currentLocation();
    this.getWishlist();
    this.getCity("Delhi");
  }
  get loggedIn(){
    let isLoggedIn = false;
    if(this.authService.checkCredentials()){
      this.user_name = Cookie.get("user");
     // this.user_name = userDetails.firstname+' '+userDetails.lastname;
      isLoggedIn = true;
    }
    return isLoggedIn;
  }

  currentLocation() {
  	if('geolocation' in navigator) {
      this.coords= {
        lat: null,
        lon: null
      }
  		navigator.geolocation.watchPosition((position) => {
        this.coords.lat = position.coords.latitude;
        this.coords.lon = position.coords.longitude;
        if(this.flag == true){
        this.getLocation(this.coords);
        this.flag = false;
        }

      })

    }
  }

  getLocation(position: Icoords) {
  	const promise = this.weatherService.getWeatherDataByCoords(position.lat, position.lon).toPromise();
    
    promise.then((data) => {
      this.weatherData = data;
      this.getForecast(data['coord'].lat,data['coord'].lon);
    }, (error) => {
      this.weatherData = error;
    })
  }

  getCity(city: string) {
    const promise = this.weatherService.getWeatherDataByCityName(city).toPromise();
    
    promise.then((data) => {
      this.weatherData = data;
      this.getForecast(data['coord'].lat,data['coord'].lon);

    }, (error) => {
      this.weatherData = error;
    })
  }

  getForecast(lat,lon){
    const promise = this.weatherService.getWeatherForecast(lat,lon).toPromise();
    promise.then((data)=>{
      this.weatherForecast=data;
    },(error)=>{
      this.weatherForecast = error;
    }
    );
  }

  more_info() {
    if(this.moreInfo === false) {
      this.moreInfo = true;
      this.moreInfoText = 'Hide Info';
      var date1 = new Date(this.weatherData.sys.sunrise * 1000);
      var date2 = new Date(this.weatherData.sys.sunset * 1000);
      this.sunrise_time = date1.toLocaleTimeString();
      this.sunset_time = date2.toLocaleTimeString();
    } else if(this.moreInfo === true) {
      this.moreInfo = false;
      this.moreInfoText = 'Show More Info';
    }
  }
  
  weatherForecastInfo() {
    if(this.showForecast === false) {
      this.showForecast = true;
      this.forecastText = 'Hide Forecast';
      var date1 = new Date(this.weatherData.sys.sunrise * 1000);
      var date2 = new Date(this.weatherData.sys.sunset * 1000);
      this.sunrise_time = date1.toLocaleTimeString();
      this.sunset_time = date2.toLocaleTimeString();
    } else if(this.showForecast === true) {
      this.showForecast = false;
      this.forecastText = 'Show Forecast';
    }
  } 

  getWishlist() {
    this.wishlist=[{city:'Mumbai'},{city:'Delhi'},{city:'Bangalore'},{city:'Kolkata'}];
    // if(Cookie.get('access_token')){
    //   const promise = this.watchlistService.getWeather().toPromise();
    //   promise.then((data) => {
    //     this.wishlist = data;
    //   }, (error) => {
    //     this.wishlist = error;
    //   })
    // } else {
    //   this.wishlist=[{city:'Mumbai'},{city:'Delhi'},{city:'Bangalore'},{city:'Kolkata'}];
    // }
  }

  
  addWeatherToWatchListdb() {
    this.cityWeather={
      "cityId":this.weatherData.id,
      "name":this.weatherData.name,
      "temperature":{
            "feelsLike":this.weatherData.main.feels_like,
            "humidity":this.weatherData.main.humidity, 
            "pressure":this.weatherData.main.pressure,
            "tempMax":this.weatherData.main.temp_max,
            "tempMin":this.weatherData.main.temp_min,
            "temp":this.weatherData.main.temp
          },
    "coord":{"longitude":this.weatherData.coord.lon,"latitude":this.weatherData.coord.lat},
    "visibility":this.weatherData.visibility,
    "weather":{"description":this.weatherData.weather[0].description,"mainInfo":this.weatherData.weather[0].main},
    "country":"IN"};
    console.log(this.cityWeather); 
    const obser = {
      next: (data: CityWeather) => {
          console.log(data);
          this.flag1 = true;
          setInterval(() => {
          this.flag1 = false
            }, 2000);
      },
      error:(err:Error)=>{
        this.alreadyflag = true;
          setInterval(() => {
          this.alreadyflag = false
            }, 2000);
      }
    }


    const observer =  this.watchlistService.addWeather(this.cityWeather);
    observer.subscribe(obser);
  }

}

interface Icoords{
  lat: number,
  lon: number
}
