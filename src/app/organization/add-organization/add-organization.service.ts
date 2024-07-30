import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../../home/otp.service";
import { HttpHeaders ,HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})

export class addorganizationservice{
    private baseurl =  'https://chiefnet-stg-api.yavar.in';

    constructor(private otpservice:otpservice,private http:HttpClient){}
getorganization(organization:{organization:{name:string, description:string, uuid:string, client_email:string,client_mobile_no:string,client_address:string ,prisma_firewall:string}}):Observable<any>{
    const AccessToken=this.otpservice.getAccessToken();   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('Authorization', `${AccessToken}`); 
return this.http.post <any>(`${this.baseurl}/v1/organizations`,organization,{headers})
}

}