import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateuserservice } from './updateuser.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent implements OnInit {
userform : FormGroup; 
organization: any[] = [];
organization_id :string='';
role1:any='';
role:any='';
editmode:boolean= false;
useridtoedit:string ='';

constructor(private fb:FormBuilder,private updateuserservice:updateuserservice,private router:Router,private route:ActivatedRoute){
  this.userform= this.fb.group({
    
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    organization_id: []
  })
  console.log(this.userform);
}
  ngOnInit(): void {
    
    this. role1=[
      {name:'Super Admin'},
      {name:'Customer Admin'}
    ]
    this .updateuserservice.getorgan().subscribe({
      next:Response => {
       this.organization =Response;
        console.log(this.organization);

      },
      error:error =>{
        console.error('Error fetching organization data', error);

      }

    });
   
  }
   
 

onsumit(){
  if(this.userform.valid){
    const user={
      user:{
        name:this.userform.get('name')?.value,
        email:this.userform.get('email')?.value,
        role:this.role,
        organization_id:this.organization_id.toString(),
      }
    }
    console.log(user);
    this.updateuserservice.createuser(user).subscribe({
       next:Response =>{
        this.showSuccessToast();
        setTimeout(() => {
          this.router.navigate(['/home-1']);
        }, 1000);
       },
       error:error =>{
        
       }
    })
  }
}

showSuccessToast() {
  const toastElement = document.getElementById('successToast');
  if (toastElement) {
    const toast = new Toast(toastElement);
    toast.show();
  } else {
    console.error('Toast element not found');
  }
}

}
