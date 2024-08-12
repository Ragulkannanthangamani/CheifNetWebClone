import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Devicesservice } from './devices.service';
import { Toast } from 'bootstrap';
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
    localStorage.clear();
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

adddevice(){
  this.router.navigate(['/AddDevices']);
}

Delectdevice(){
this.deviceservice.Delectdevice(this.selectedDeviceId).subscribe({
  next:Response=>{
    console.log('Organization deleted successfully', Response);
    this.showdeleteToast();
    this.fetchdata(); 
  },
  error:err=>{
    console.error('Error deleting organization', err);
   this.showdeleteErrToast();
  }
})
}
showdeleteToast() {
  const toastElement = document.getElementById('deleteToast');
  if (toastElement) {
    const toast = new Toast(toastElement);
    toast.show();
  } else {
    console.error('Toast element not found');
  }
}
showdeleteErrToast() {
  const toastElement = document.getElementById('deleteErrToast');
  if (toastElement) {
    const toast = new Toast(toastElement);
    toast.show();
  } else {
    console.error('Toast element not found');
  }
}
}
