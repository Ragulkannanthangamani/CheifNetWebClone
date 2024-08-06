import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { otpservice} from "../home/otp.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
interface device{
       id: 0;
      name: string;
      uuid: string;
      is_online: true;
      is_system_upgrade_online: true;
      organization_id: 0;
      type: string;
      model_id: 0;
      state: string;
      provisioned_at: string;
      mac_address: string;
      os_version: string;
      package_version: string;
      model: string;
      lan_interfaces:  null;
      wan_interfaces: null;
      latitude: 0;
      longitude: 0;
      location: string;
      incharge_name: string;
      incharge_email: string;
      incharge_mobile_no: string;
      is_vpn_server_configured: true;
      is_ipsec_server_configured: true;
      description: string;
      created_at: string;
      updated_at: string;
      organization: null,
      device_model: null;
}
interface  pagination {
    total_count: 0;
    current_page: 0;
    per_page: 0;
    total_pages: 0;
    next_page: null;
    prev_page:null,
    is_first_page: true;
    is_last_page: true;
    start_at: null,
    end_at: null;
  }
  interface ApiResponse{
    devices:device[];
    pagination:pagination
  }

@Injectable({
    providedIn: 'root'
})

export class Devicesservice {
  private devicelist= 'devicelist';
 private baseurl =  'https://chiefnet-stg-api.yavar.in';
constructor(private otpservice:otpservice,private http:HttpClient){}

getdevice():Observable<ApiResponse>{
    const AccessToken=this.otpservice.getAccessToken(); 
    const headers = new HttpHeaders()
    .set('Authorization', `${AccessToken}`);

    let params = new HttpParams();
    params = params.append('visible_columns', 'location,uuid,state,type,organization,is_online,os_version')
return this.http.get<ApiResponse>(`${this.baseurl}/v1/devices`, { headers:headers,params });
}
  
savelocalstorage(devicelist:any):void{
  console.log(devicelist);
   localStorage.setItem(this.devicelist,devicelist);
}

getlocalstorage():any[] | null{
  let devicejson=localStorage.getItem(this.devicelist)
 
if (devicejson !== null) {
  return JSON.parse(devicejson);
} else {
  return null;
}
}
}
