import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { organizationservice } from './organization.service';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent implements OnInit {
  
  issidebarvisible =true;
  organizations:any[]=[];
  pagination: any = {};
  constructor(private router:Router,private organizationservice:organizationservice){}
  
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
  this.organizationservice.getorganization().subscribe({
    next:Response =>{
      console.log(Response);
      this.organizations= Response.organizations;
      this.pagination=Response.pagination;
    },
    error:err=>{
      console.log('something gone mistake',err);
    }
 })
  }
onclicked(){
  this.router.navigate(['/AddOrganization']);
}
}
