import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }

  registerUser(userData){ 
    let params = {
      'firstName':String=userData.firstname,
      'lastName':String=userData.lastname,
      'username':String=userData.email,
      'phone':String=userData.phone,
      'password':String=userData.password};
    console.log(params);
    let headers = 
      new HttpHeaders({'Content-type': 'application/json', 'Accept': '*/*'});
    let options = ({ headers: headers });
    
    this.http.post(environment.apiUrl+'/user-api/user/register', 
      params)
      .subscribe(
        data => {this.router.navigate(['/login'],{state:{message:'Registration Successful.',status:'success'}});
      },
        err => alert("Not Valid")); 
  }

  updateProfile(userData){
    let params = {
      
      'firstName':userData.firstname,
      'lastName':userData.lastname,
      'username':Cookie.get("user"),
      'phone':userData.phone};
    
    let headers = 
      new HttpHeaders({'Content-type': 'application/json',
      'Accept': '*/*','Authorization': 'Bearer '+Cookie.get('access_token')});
    let options = ({ headers: headers });
    
    this.http.post(environment.apiUrl+'/user-api/user/update', 
      params)
      .subscribe(
        data => {
          alert('Profile updated successfully.');

          const userDetails = this.getUserDetails();
          // userDetails.firstname=userData.firstname;
          // userDetails.lastname=userData.lastname;
          // userDetails.phone=userData.phone
         
          Cookie.set("user",JSON.stringify(userDetails));
          this.router.navigate(['/'],{state:{message:'Profile updated successfully.'}});
        },
        err => alert(err)); 
  }

  changePassword(password){
    let params = {
      'username':Cookie.get("user"),
      'password':password
    };
    
    let headers = 
      new HttpHeaders({'Content-type': 'application/json',
      'Accept': '*/*','Authorization': 'Bearer '+Cookie.get('access_token')});
    let options = ({ headers: headers });
    
    this.http.post(environment.apiUrl+'/user-api/user/update', 
      params)
      .subscribe(
        data => {
          alert('Password updated successfully.');
          this.router.navigate(['/'],{state:{message:'Password updated successfully.'}});
        },
        err => alert(err)); 
  }

  getUserDetails(){
    return Cookie.get("user");
  }
}
