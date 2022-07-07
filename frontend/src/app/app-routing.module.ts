import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCitiesWeatherComponent } from './component/list-cities-weather/list-cities-weather.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { MainComponent } from './component/main/main.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { UpdateProfileComponent } from './component/updateProfile/updateProfile.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path:'main',
    component:MainComponent
  },
  {
    path:'login',
    component:LogInComponent
  },
  {
    path:'registration',
    component:RegistrationComponent
  },
  {
    path:'updateProfile',
    component:UpdateProfileComponent
  },
  {
    path:'showFav',
    component:ListCitiesWeatherComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }