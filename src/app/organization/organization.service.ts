import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../home/otp.service";
import { HttpHeaders, HttpParams,HttpClient } from "@angular/common/http";


interface organization{
      id: 0
      name: string;
      description: string;
      devices_count: 0;
      provisioned_devices_count: 0;
      uuid: string;
      client_email: string;
      client_mobile_no: string;
      client_name: string;
      client_address: string;
      created_by: 0;
      updated_by: 0;
      created_at: string;
      updated_at: string;
      prisma_firewall: true
}
interface pagination{
    total_count: 0;
    current_page: 0;
    per_page: 0;
    total_pages: 0;
    next_page: "Unknown Type: number,null";
    prev_page: "Unknown Type: number,null";
    is_first_page: true;
    is_last_page: true;
    start_at: "Unknown Type: number,null";
    end_at: "Unknown Type: number,null";
}

interface ApiResponse {
    organizations: organization[];
    pagination: pagination;
}

@Injectable({
    providedIn: 'root'
})

export class organizationservice {
    private baseurl =  'https://chiefnet-stg-api.yavar.in';
constructor(private otpservice:otpservice,private http:HttpClient){}
getorganization():Observable< ApiResponse>{
    const AccessToken=this.otpservice.getAccessToken();
    const headers = new HttpHeaders()
    .set('Authorization', `${AccessToken}`);

    let params = new HttpParams();
    params = params.append('visible_columns', 'Name,UUID,Device cont,Provisioned devices count,Prisma Servers,Client name,client email,client phone,Client Address')



    console.log(params, 'logging params');
 return this.http.get< ApiResponse>(`${this.baseurl}/v1/organizations`, { headers:headers,params });

}
}