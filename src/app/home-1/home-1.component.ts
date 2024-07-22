import { Component, OnInit } from '@angular/core';
import { home1service } from './home-1.service';
import { otpservice } from '../home/otp.service';
import { Router } from '@angular/router';
import { updateuserservice } from '../updateuser/updateuser.service';
@Component({
  selector: 'app-home-1',
  templateUrl: './home-1.component.html',
  styleUrl: './home-1.component.css'
})
export class Home1Component implements OnInit {

  users:any[]=[];
  pagination: any = {};
  errorMessage: string | null = null;
  isLoading = true;
  
  constructor(private home1service: home1service,private otpservice:otpservice,private router:Router,private user:updateuserservice){

  }

  ngOnInit(): void {
    this.fetchdata();

  
  };

  fetchdata(){
    this.home1service.getUsers().subscribe({

      next:(response)=>{
                    this.users=response.users;
                    this.pagination=response.pagination;
                    this.isLoading=false;
                    console.log(response);
                    const userjson= JSON.stringify(response.users);
                    this.home1service.savelocalstorage(userjson);
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.errorMessage = 'Error fetching data. Please try again later.';
        this.isLoading = false;
      }
      

    })
  }
  onclicked(){
    this.router.navigate(['/updateuser']);
  }

  onEdituser(id:string){
    this.router.navigate(['/updateuser',id]);
}

logout(){
  localStorage.clear;
  this.router.navigate(['/login']);
}
}

