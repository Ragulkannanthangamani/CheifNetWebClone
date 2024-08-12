import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../../home/otp.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class adddeviceservice {
    private baseurl =  'https://chiefnet-stg-api.yavar.in';
    constructor(private otpservice:otpservice,private http:HttpClient){}

    getdevice(device:{device:{name:string,uuid:string,organization_id:number,type:string
        ,latitude:number,longitude:number,location:string,incharge_name:string
        ,incharge_email:string,incharge_mobile_no:number,model_id:string,description:string}})
        :Observable<any>{
            const AccessToken=this.otpservice.getAccessToken();   
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
            .set('Authorization', `${AccessToken}`); 
            return  this.http.post <any>(`${this.baseurl}/v1/devices`,device,{headers})
}}