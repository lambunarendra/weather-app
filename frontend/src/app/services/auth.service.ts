import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _http: HttpClient) { }

  obtainAccessToken(loginData){
   
    let params={'username':String=loginData.username,'password':String=loginData.password}
    
    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8','Authorization': 'Basic '+btoa("mobile:pin")}); 
      
    let options = ({ headers: headers });
    
   const token:Observable<String>= this._http.post(environment.apiUrl+'/user-api/user/login', 
      params, { responseType: "text" }) 
      
      return token; 
  }

  saveToken(username,token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token, expireDate);
    Cookie.set("user",username,expireDate);
  }

  getToken(){
    return Cookie.get('access_token');
  }

  checkCredentials(): boolean{
    const loggedIn = Cookie.get('access_token')?true:false;
    return loggedIn;
  } 

  logout() {
    Cookie.delete('access_token');
    Cookie.delete('user');
    this._router.navigate(['/login'],{state:{message:'Logged out Successfully.',status:'success'}});
  }
}
