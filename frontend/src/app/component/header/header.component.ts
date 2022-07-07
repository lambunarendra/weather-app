import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  user_name = "";
  sts=false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //this.loggedIn = this.authService.checkCredentials();
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

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }  

  logout(): void {
    this.authService.logout();
  }
  clickedicon(){
    this.sts=(this.sts)?false:true;
  }
}
