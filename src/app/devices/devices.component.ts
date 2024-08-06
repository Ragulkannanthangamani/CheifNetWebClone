import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Devicesservice } from './devices.service';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {
  issidebarvisible=true;
  devices:any[]=[];
  errorMessage: string | null = null;
  isLoading = true;
  selectedDeviceId:string ='';
  buttondisable:boolean=false;
  

  constructor(private router:Router,private deviceservice:Devicesservice){}
  ngOnInit(): void {
   this.fetchdata();
  }

  logout(){
    localStorage.clear;
    this.router.navigate(['/login']);
  }
  toggleSidebar(){
    this.issidebarvisible=!this.issidebarvisible;
  }

 fetchdata(){
this.deviceservice.getdevice().subscribe({
  next:Response=>{
    console.log('devices retrived',Response);
    this.devices= Response.devices
    this.isLoading=false;
    const devicejson= JSON.stringify(Response.devices);
    this.deviceservice.savelocalstorage(devicejson);
  },
  error:err=>{
    console.error('Error fetching data', err);
        this.errorMessage = 'Error fetching data. Please try again later.';
        this.isLoading = false;
  }
})
 }
 selectDevice(id: string) {
  this.selectedDeviceId = id;
  this.buttondisable=true;
}
editdevice(){
  this.router.navigate(['/Editdevice',this.selectedDeviceId]);
}
}
