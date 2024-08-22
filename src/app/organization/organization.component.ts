import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { organizationservice } from './organization.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent implements OnInit {
  
  issidebarvisible =true;
  organizations:any[]=[];
  pagination: any = {};
  selectedOrganizationId: string = '';
  buttondisable:boolean=false;
  successmessage:boolean=false;
  currentPage=1;
  perPage=10;
  mydisable:boolean=false;
  constructor(private router:Router,private organizationservice:organizationservice){}
  
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
  fetchdata(page:number){
  this.organizationservice.getorganization(page,this.perPage).subscribe({
    next:Response =>{
      console.log(Response);
      this.organizations= Response.organizations;
      
      this.pagination=Response.pagination;
      this.currentPage=page;
      const userjson= JSON.stringify(Response.organizations);
      this.organizationservice.savelocalstorage(userjson);
    },
    error:err=>{
      console.log('something gone mistake',err);
     
    }
 })
  }

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
onclicked(){
  this.router.navigate(['/AddOrganization']);
}
selectOrganization(id: string,org:number) {
  this.selectedOrganizationId = id;
  console.log(org);
  
  this.buttondisable=true
  if(org !== 0){
     this.mydisable = true;
  } else{
    this.mydisable = false;
  }
  
}
deleteOrganization(){
 
  this.organizationservice.deleteOrganization( this.selectedOrganizationId).subscribe({
    next:Response=>{
      console.log('Organization deleted successfully', Response);
      this.fetchdata(this.currentPage); 
      
     
    },
    error:err=>{
      console.error('Error deleting organization', err);
      // this.successmessage=true;
      // setTimeout(() => {
      //   this.successmessage = false;
      // }, 1000);
      this.showdeleteToast();
    }
    
  })
 
}
editorganization(){
    if (this.selectedOrganizationId) {
      this.router.navigate(['/EditOrganization', this.selectedOrganizationId]);
    } else {
      console.log('No organization selected');
    }
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
}
