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

  constructor(private router:Router,private organizationservice:organizationservice){}
  
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
  this.organizationservice.getorganization().subscribe({
    next:Response =>{
      console.log(Response);
      this.organizations= Response.organizations;
      this.pagination=Response.pagination;
      const userjson= JSON.stringify(Response.organizations);
      this.organizationservice.savelocalstorage(userjson);
    },
    error:err=>{
      console.log('something gone mistake',err);
     
    }
 })
  }
onclicked(){
  this.router.navigate(['/AddOrganization']);
}
selectOrganization(id: string) {
  this.selectedOrganizationId = id;
  this.buttondisable=true
}

deleteOrganization(){
 
  this.organizationservice.deleteOrganization( this.selectedOrganizationId).subscribe({
    next:Response=>{
      console.log('Organization deleted successfully', Response);
      this.fetchdata(); 
      
     
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
