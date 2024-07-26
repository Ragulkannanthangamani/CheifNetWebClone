import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent implements OnInit {
  userform:FormGroup
  constructor(private fb:FormBuilder){
    this.userform=this.fb.group({
      name :['',Validators.required],
      Description:['',Validators.required],
      UUID:['',Validators.required],
      ClientEmail:['',Validators.required],
      ClientMobileno:['',Validators.required],
      ClientName:['',Validators.required],
      ClientAddress:['',Validators.required],
      PrismaFirewall:['',Validators.required]
  })
  console.log(this.userform);
  
  }
  ngOnInit(): void {
    
  }

}
