import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { adddeviceservice } from './add-devices.service';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrl: './add-devices.component.css'
})
export class AddDevicesComponent implements OnInit{
 deviceform:FormGroup
 isLoading:boolean=false;

  constructor(private fb:FormBuilder,private adddeviceserivce:adddeviceservice ,private route:Router){
   this.deviceform= this.fb.group({
      name: ['', Validators.required],
      uuid: ['', Validators.required],
      organization_id: ['', Validators.required],
      type: ['', Validators.required],
      latitude: ['', [Validators.required,Validators.pattern('^[+-]?([0-9]*[.])?[0-9]+$')]],
      longitude: ['', [Validators.required, Validators.pattern('^[+-]?([0-9]*[.])?[0-9]+$')]],
      location: ['', Validators.required],
      incharge_name: ['', [Validators.required, Validators.minLength(3)]],
      incharge_email: ['', [Validators.required, Validators.email]],
      incharge_mobile_no: ['', [Validators.pattern('^[0-9]*$')]],
      model_id: ['', Validators.required],
      description: ['']
   })
  }
  
  ngOnInit(): void {
    console.log(this.deviceform);
  }
onsubmit():void{
  if(this.deviceform.valid){
      const device={
        device:{
          name:this.deviceform.get('name')?.value,
          uuid:this.deviceform.get('uuid')?.value,
          organization_id:this.deviceform.get('organization_id')?.value,
          type:this.deviceform.get('type')?.value,
          latitude:this.deviceform.get('latitude')?.value,
          longitude:this.deviceform.get('longitude')?.value,
          location:this.deviceform.get('location')?.value,
          incharge_name:this.deviceform.get('incharge_name')?.value,
          incharge_email:this.deviceform.get('incharge_email')?.value,
          incharge_mobile_no:this.deviceform.get('incharge_mobile_no')?.value,
          model_id:this.deviceform.get('model_id')?.value,
          description:this.deviceform.get('description')?.value,
        }
      }
      console.log(device);
      this.adddeviceserivce.getdevice(device).subscribe({
        next:Response=>{
          console.log(Response,'device');
          this.isLoading= true;
          this.route.navigate(['/Devices'])
          this.showSuccessToast()
        },
        error:err=>{
          console.log('some error happaned during request');
          
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

