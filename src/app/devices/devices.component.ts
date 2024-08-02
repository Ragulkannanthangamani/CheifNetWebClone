import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {
  issidebarvisible=true;
  constructor(private router:Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout(){
    localStorage.clear;
    this.router.navigate(['/login']);
  }
  toggleSidebar(){
    this.issidebarvisible=!this.issidebarvisible;
  }

 fetchdata(){
  this
 }
}
