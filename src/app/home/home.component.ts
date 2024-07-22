import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { otpservice } from './otp.service';
import { Router } from '@angular/router'
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent implements OnInit {
 
 otpform:FormGroup;
 errorMessage=''
  email: string='';
isloading:boolean= false;
loadingDelay = 3000;
  
  constructor(private fb :FormBuilder,private otpservice:otpservice,private router:Router){
      this.otpform = this  .fb.group({
      otp:['',[Validators.required,   this.validateOtpLength]]
    });
    const navigate = this.router.getCurrentNavigation();
    const state = navigate ?.extras.state as {email: string};
    if (state && state.email) {
      this.email = state.email;
    } else {
      console.error('Email not found in navigation state');
    }
  }
  ngOnInit(): void {
     
    }

                        //  custom validation
    validateOtpLength(control: AbstractControl): { [key: string]: any } | null {
      const value = control.value;
      if (value && value.length !== 4) {
        return { 'invalidLength': true };
      }
      return null;
    }
                  //  validation
 submit():void{
                    
  if(this.otpform .valid){
  
      this.isloading=true;
    console.log('spinner:',this.isloading);
    
      console.log('OTP CODE :', this.otpform.value.otp);    
      console.log('EMAIL:',this.email);
      

      const user={
        user:{
          otp:this.otpform.get('otp')?.value,
          email:this.email
        }
      }
   
      this.otpservice.verifyotp(user) .subscribe ({

        next:Response =>{
          console .log( 'success',Response);
          
          // setTimeout(() => {
          //   this.isloading=false;
          // },this.loadingDelay ); 

          const AccessToken = Response.headers.get('Authorization');
          const refreshToken=Response.headers.get('Refresh-Token');
         
          console.log(AccessToken);
          console.log(refreshToken);
          this.otpservice.setAccessToken(AccessToken);
         this.otpservice.setRefreshToken(refreshToken);
         this.router.navigate(['/home-1']);
         
        },

        error:error =>{
          console.log('Error',error); 
          
          setTimeout(() => {
            this.isloading=false;
          },this.loadingDelay);
          console.log('spinner:',this.isloading);
            this.errorMessage= 'please enter valid OTP Code...'
          
        }
      }

      )
   }
 }
}