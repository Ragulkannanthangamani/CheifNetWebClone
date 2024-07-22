import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, RequiredValidator, Validators } from '@angular/forms';
import { athuservice } from '../auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { state } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signinform:FormGroup;
  showpassword=false;
  errorMessage: string | null = null;
  remember_me=false
  isloading:boolean=false;

    constructor(private fb: FormBuilder,private authservice:athuservice, private router:Router){
      this.signinform= this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]],
        remember_me:[]
      })
    }
    
  ngOnInit(): void {
  
  }
  
    togglepasswordvisibility(){
    this.showpassword=!this.showpassword
  }
  
    onsignin():void{

      this.isloading=true;
      // let url='http://localhost:4200/home';
      // this.router.navigateByUrl(url);
     if(this.signinform.valid){
      console.log(this.signinform.value);
      const user={
        user:{
        email: this.signinform.get('email')?.value,
        password : this.signinform.get('password')?.value,
        remember_me : this.remember_me
      } 
    }
 
      this.authservice.signIn(user).subscribe(
        { next:Response =>{
          console.log('success',Response);

          this.isloading=false;
          // let url='http://localhost:4200/home';
          this.router.navigate(['/home'],{state:{email :user.user.email }});
     
         },
  
         error:error =>{
                 console.log('Error',error); 
                 this.errorMessage= 'An Error occurs during signin . please try again...'
                 this.isloading=false;
         }}
      )
  
  
     }
    
  }


}
