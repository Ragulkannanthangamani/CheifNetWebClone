import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../../home/otp.service";
import { HttpHeaders,HttpClient } from "@angular/common/http";



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
}