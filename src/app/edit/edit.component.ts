import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { home1service } from '../home-1/home-1.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  userform : FormGroup ; 
 successmessage:boolean=false;
  userdata:any='';
  isloading:boolean= false;
  constructor(private route:Router, private home1service:home1service,private routes :ActivatedRoute,private fb:FormBuilder){
    this.userform = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      organization_id: ['']
    });
  }

  ngOnInit(): void {
    
      const userid = this.routes.snapshot.paramMap.get('id');
      console.log(userid);
      if(userid){
        const useridnum = Number(userid);
        const userlist=this.home1service.getlocalstorage();
        console.log(userlist);
      if(userlist){
        this.userdata = userlist.find((user:any)=>user.id === useridnum);
      
      if(this.userdata){
        console.log('User found:',this.userdata);
        this .userform.patchValue(this .userdata);
        
      }else{
        console.log('User is not found');
      }
      }else{
        console.log('Userlist is not found in localstorage');
    }
    }else{
      console.log('User ID not found in route parameters');
    }

  }
  
 

  onsumit() {
    if(this.userform.valid){
      const userid =this.routes.snapshot.paramMap.get('id');
      const useridnum = Number(userid);
      const updateduserdata = this.userform.get('name')?.value;
      const user ={
        user:{
          name:updateduserdata
        }
      }
      this.home1service.updateuserbyid(useridnum,user).subscribe({
        next:Response=>{
          console.log('User updated successfully:', Response);
        this.isloading= true;
          this.successmessage=true;
          setTimeout(() => {
            this.successmessage = false;
            this.route.navigate(['/home-1'])
          }, 1000);
         
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      })
    }
    }

}
