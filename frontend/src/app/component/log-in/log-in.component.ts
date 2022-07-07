import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit { 
  
  message="";
  status=false;
  errMsg:String;
  flag=false;

  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if(navigation.extras && navigation.extras.state){
      const state = navigation.extras.state as {message: string,status: string};
      this.message = state.message;
      this.status = state.status=="success";
      /*setTimeout(()=>{
        this.message = "";
      }, 3000);*/
    }
   }

  loginForm = this.formBuilder.group({
    username:['',Validators.required],
    password:['',Validators.required]
  });
  
  ngOnInit(): void {
  }

  onSubmit():void{
    const username:String=this.loginForm.get('username').value;
    const password:String=this.loginForm.get('password').value;
    const observer = {
      next: (token: string) => {
        console.log('received token', token);
        this.errMsg = undefined;
        this.authService.saveToken(username, token);
        this.router.navigate(['/']); 
       // this.router.navigate([`/city-weather/${localStorage.getItem('currentCity')}/null`]);
      },

      error: (err: Error) => {
        this.errMsg = err.message;
        this.flag = true;
        setInterval(()=>{
          this.flag = false;
        },2000)
        console.log("error",err);
        alert(this.errMsg);
      },
    };
    
     const token: Observable<String>=this.authService.obtainAccessToken({username:this.loginForm.get('username').value,password:this.loginForm.get('password').value});
     token.subscribe(observer);
    
  }
}
