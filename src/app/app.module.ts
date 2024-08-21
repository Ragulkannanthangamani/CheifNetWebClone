import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { Home1Component } from './home-1/home-1.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditComponent } from './edit/edit.component';
import { OrganizationComponent } from './organization/organization.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { EditOrganizationComponent } from './organization/edit-organization/edit-organization.component';
import { DevicesComponent } from './devices/devices.component';
import { EditDeviceComponent } from './devices/edit-device/edit-device.component';
import { AddDevicesComponent } from './devices/add-devices/add-devices.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './devices/AppStatus/app.status';
import { metaReducers } from './devices/reducers';
// import { reducers, metaReducers } from './devices/reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    Home1Component,
    UpdateuserComponent,
    EditComponent,
    OrganizationComponent,
    AddOrganizationComponent,
    EditOrganizationComponent,
    DevicesComponent,
    EditDeviceComponent,
    AddDevicesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    StoreModule.forRoot(reducers, {
      // metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }      
    })
    
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
