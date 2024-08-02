import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { organizationservice } from '../organization.service';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrl: './edit-organization.component.css'
})
export class EditOrganizationComponent implements OnInit {
  userform: FormGroup
  organdata: any = '';
  isLoading = false; 
  constructor(private fb: FormBuilder, private route: Router, private routes: ActivatedRoute, private organizationservice: organizationservice) {
    this.userform = this.fb.group({
      name: ['', Validators.required],
      description: [null],
      uuid: ['', Validators.required],
      client_email: ['', [Validators.required,Validators.email]],
      client_mobile_no: [null, Validators.pattern('^[0-9]*$')],
      client_name: ['',[Validators.required,Validators.minLength(3)]],
      client_address: [null],
      prisma_firewall: [null, Validators.required]
    })
  }
  ngOnInit(): void {
    const organid = this.routes.snapshot.paramMap.get('id');
    if (organid) {
      const organidnum = Number(organid);
      const organizationlist = this.organizationservice.getlocalstorage();
      console.log(organizationlist);
      console.log(organidnum);

      if (organizationlist) {
        this.organdata = organizationlist.find((organizationlist: any) => organizationlist.id === organidnum);

        if (this.organdata) {
          console.log('Organization found:', this.organdata);
          this.userform.patchValue(this.organdata);

        } else {
          console.log('organization is not found');
        }
      } else {
        console.log('organizationlist is not found in localstorage');

      }
    } else {
      console.log('organID not found in route parameters');
    }
  }
  onsubmit(){
    if(this.userform.valid){
      this.isLoading = true; 
      const organid = this.routes.snapshot.paramMap.get('id');
      const organidnum = Number(organid);
      const organization ={
        organization:{
          name:this.userform.get('name')?.value,
          description:this.userform.get('description')?.value,
          uuid:this.userform.get('uuid')?.value,
          client_email:this.userform.get('client_email')?.value,
          client_mobile_no:this.userform.get('client_mobile_no')?.value,
          client_name:this.userform.get('client_name')?.value,
          client_address:this.userform.get('client_address')?.value,
          prisma_firewall:this.userform.get('prisma_firewall')?.value
        }
      }
  console.log(organization,'my');
  this.organizationservice.saveorgan(organization,organidnum).subscribe( {
      
    next:Response=>{
      this.isLoading = true;
      console.log(Response);
      this.showSuccessToast();
          setTimeout(() => {
            this.route.navigate(['/organization']);
          }, 1000);
    },
    error: () => {
      this.isLoading = false;  
      console.log('something happened in editing organization');
      
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