import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Home1Component } from './home-1/home-1.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'',component:LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path:'home-1',component: Home1Component},
  { path:'updateuser',component:UpdateuserComponent},
  { path: 'updateuser/:id',component:EditComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
