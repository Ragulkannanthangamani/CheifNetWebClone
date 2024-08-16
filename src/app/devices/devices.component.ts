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
  currentPage=1;
  perPage=10;
  pagination: any = {}; 
  
  constructor(private router:Router,private deviceservice:Devicesservice){}
  ngOnInit(): void {
   this.fetchdata(this.currentPage);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  toggleSidebar(){
    this.issidebarvisible=!this.issidebarvisible;
  }

 fetchdata(page:number):void{
this.deviceservice.getdevice(page,this.perPage).subscribe({
  next:Response=>{
    console.log('devices retrived',Response);
    console.log('device pagination',Response.pagination);
    
    this.devices= Response.devices
    this.pagination = Response.pagination; 
    this.currentPage = page; 
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

//  goToPage(page: number): void {
//   if (page >= 1 && page <= this.pagination.total_pages) {
//     this.fetchdata(page);
//   }
// }

nextPage(): void {
  if (this.pagination.next_page !== null) {
    this.fetchdata(this.pagination.next_page);
  }
}


prevPage(): void {
  if (this.pagination.prev_page !== null) {
    this.fetchdata(this.pagination.prev_page);
  }
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
    this.fetchdata(this.currentPage); 
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
