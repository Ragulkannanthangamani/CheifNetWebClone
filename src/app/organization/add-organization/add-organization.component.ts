import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addorganizationservice } from './add-organization.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent implements OnInit {
  userform:FormGroup
  successmessage:boolean=false;

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
      console.log(this.userform.value);
      const organization={
        organization: {
          name: this. userform.get('name')?.value ,
          description: this. userform.get('description')?.value ,
          uuid: this. userform.get('uuid')?.value ,
          client_email: this. userform.get('client_email')?.value ,
          client_mobile_no: this. userform.get('client_mobile_no')?.value ,
          client_address: this. userform.get('client_address')?.value ,
          prisma_firewall: this. userform.get('prisma_firewall')?.value 
        }
      
        
}
console.log(organization);

    this.addorganizationservice.getorganization(organization).subscribe( {
      
    next:Response=>{
      console.log(Response);

      this.successmessage=true;
      setTimeout(() => {
        this.successmessage = false;
        this.route.navigate(['/organization'])
      }, 1000);
    },
    error:err=>{
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
}


