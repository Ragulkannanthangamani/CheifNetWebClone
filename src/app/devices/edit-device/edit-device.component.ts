import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Devicesservice } from '../devices.service';
import { editdeviceservice } from './edit-device.service';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrl: './edit-device.component.css'
})
export class EditDeviceComponent implements OnInit{
  userform: FormGroup;
  devicedata:any='';
  errormessage: string | null = null;
  showToast: boolean = false;

  constructor(private fb:FormBuilder,private routes:ActivatedRoute,private deviceservice:Devicesservice,private editdeviceservice:editdeviceservice,private router:Router){
    this.userform = this.fb.group({
      name: ['', Validators.required],
      organization_id: [0, Validators.required],
      type: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      location: ['', Validators.required],
      incharge_name: ['', [Validators.required, Validators.minLength(3)]],
      incharge_email: ['', [Validators.required, Validators.email]],
      incharge_mobile_no: [null, Validators.pattern('^[0-9]*$')],
      description: ['']
    });
  }
  ngOnInit(): void {
    const deviceid = this.routes.snapshot.paramMap.get('id');
    if(deviceid){
      const deviceidnum = Number(deviceid);
      const devicelist = this.deviceservice.getlocalstorage();
      console.log(devicelist);
      console.log(deviceidnum);

      if (devicelist) {
        this.devicedata = devicelist.find((devicelist: any) => devicelist.id === deviceidnum);

        if (this.devicedata) {
          console.log('Device found:', this.devicedata);
          this.userform.patchValue(this.devicedata);

        } else {
          this.errormessage='Device not found check further'
          console.log('device is not found');
          this.showToast=true;
          setTimeout(() => {
            this.showToast = false;
          }, 4000);
        }
  }else {
    console.log('devicelist is not found in localstorage');

  }
}else {
  console.log('DeviceID not found in route parameters');
}
  }

  onsubmit(){
    if(this.userform.valid){
      const deviceid = this.routes.snapshot.paramMap.get('id');
      const deviceidnum = Number(deviceid);
      const device ={
        device:{
          name:this.userform.get('name')?.value ,
          organization_id:this.userform.get('organization_id')?.value,
          type:this.userform.get('type')?.value,
          latitude:this.userform.get('latitude')?.value,
          longitude:this.userform.get('longitude')?.value,
          location:this.userform.get('location')?.value,
          incharge_name:this.userform.get('incharge_name')?.value,
          incharge_email:this.userform?. get('incharge_email')?.value,
          incharge_mobile_no:this.userform?.get('incharge_mobile_no')?.value,
          description:this.userform.get('description')?.value 
        }
      }
      console.log('submit',device);
      this.editdeviceservice.SaveEditDevice(device,deviceidnum).subscribe({
        next:Response=>{
          console.log('Edited device saved successfully');
          this.showSuccessToast();
          setTimeout(() => {
            this.router.navigate(['/Devices']);
          }, 1000);
          
        },
        error: () => {
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