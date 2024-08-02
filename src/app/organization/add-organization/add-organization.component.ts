import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addorganizationservice } from './add-organization.service';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent implements OnInit {
  userform:FormGroup
  successmessage:boolean=false;
  isLoading:boolean=false;

  constructor(private fb:FormBuilder,private addorganizationservice:addorganizationservice,private route:Router){
    this.userform=this.fb.group({
      name :['',Validators.required],
      Description:['',Validators.required],
      UUID:['',Validators.required],
      ClientEmail:['',[Validators.required, Validators.email]],
      ClientMobileno:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      ClientName:['',Validators.required],
      ClientAddress:['',Validators.required],
      PrismaFirewall:['',Validators.required]
  })
  }
  ngOnInit(): void {
    
  }
  onSubmit(): void {
    if (this.userform.valid) {
      this.isLoading=true;
      console.log(this.userform.value,'submit');
      const organization={
        organization: {
          name: this. userform.get('name')?.value ,
          description: this. userform.get('Description')?.value ,
          uuid: this. userform.get('UUID')?.value ,
          client_email: this. userform.get('ClientEmail')?.value ,
          client_mobile_no: this. userform.get('ClientMobileno')?.value ,
          client_name:this.userform.get('ClientName')?.value,
          client_address: this. userform.get('ClientAddress')?.value ,
          prisma_firewall: this. userform.get('PrismaFirewall')?.value 
        }
      
        
}
console.log(organization);

    this.addorganizationservice.getorganization(organization).subscribe( {
      
    next:Response=>{
      this.isLoading=true;
      console.log(Response);
      this.showSuccessToast() ;
     // this.successmessage=true;
      setTimeout(() => {
      //  this.successmessage = false;
        this.route.navigate(['/organization'])
      }, 1000);
    },
    error:err=>{
      this.isLoading=false;
      console.error('there might some error on ADD Organization',err)
    }
     
    })
 } 
 else {
      console.log('Form is not valid');
    }
  
  }
  get f() {
     return this.userform.controls;
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


