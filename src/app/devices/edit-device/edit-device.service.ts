import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../../home/otp.service";
import { HttpHeaders,HttpClient } from "@angular/common/http";

export interface Device {
    id: number; // Required field
    name: string;
    uuid: string;
    is_online: boolean;
    is_system_upgrade_online: boolean;
    organization_id: number;
    type: string;
    model_id: number;
    state: string;
    provisioned_at: string; 
    mac_address: string;
    os_version: string;
    package_version: string;
    model: string;
    lan_interfaces?: any[]; 
    wan_interfaces?: any[]; 
    latitude: number;
    longitude: number;
    location: string;
    incharge_name: string;
    incharge_email: string;
    incharge_mobile_no: string;
    ssh_key: string;
    ssh_key_generated_at: string;
    description: string;
    traffic_steering_configuration?: Record<string, any>; 
    traffic_steering_detail?: Record<string, any>; 
  }
  

@Injectable({
    providedIn: 'root'
})

export class editdeviceservice {
    private baseurl =  'https://chiefnet-stg-api.yavar.in';
    constructor(private otpservice:otpservice,private http:HttpClient){ }

    SaveEditDevice(device:{device:{name:string,organization_id:string,type:string,latitude:string,longitude:string,location:string,incharge_name:string,incharge_email:string,incharge_mobile_no:string,description:string}},id:number)
    :Observable<any>{
        const AccessToken=this.otpservice.getAccessToken();
        const headers = new HttpHeaders().set('Authorization', `${AccessToken}`);
        return this.http.put<any>(`${this.baseurl}/v1/devices/${id}`,device,{headers })
    }

    GetDevicebyId(id:number):Observable<Device>{
        const AccessToken=this.otpservice.getAccessToken();
        const headers = new HttpHeaders().set('Authorization', `${AccessToken}`);
      return this.http.get<Device>(`${this.baseurl}/v1/devices/${id}`,{headers })
    }
}