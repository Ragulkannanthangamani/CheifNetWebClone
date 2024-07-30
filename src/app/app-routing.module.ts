import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Home1Component } from './home-1/home-1.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { EditComponent } from './edit/edit.component';
import { OrganizationComponent } from './organization/organization.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { EditOrganizationComponent } from './organization/edit-organization/edit-organization.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'',component:LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path:'home-1',component: Home1Component},
  { path:'updateuser',component:UpdateuserComponent},
  { path: 'updateuser/:id',component:EditComponent},
  { path:'organization',component:OrganizationComponent},
  { path:'AddOrganization',component:AddOrganizationComponent},
  { path:'EditOrganization/:id',component: EditOrganizationComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
