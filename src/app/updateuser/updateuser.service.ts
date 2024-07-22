import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../home/otp.service";

interface user {
   
  id: number;
  name: string;
  email: string;
  role: string;
  organization_id: string;
  organization: { id: number; name: string } | null;
  created_at: string;
  updated_at: string;
 
}

interface Pagination {
 
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
  is_first_page: boolean;
  is_last_page: boolean;
  start_at: number | null;
  end_at: number | null;
  
}

interface ApiResponse {
  users: user[];
  pagination: Pagination;
}



@Injectable({
    providedIn: 'root'
  })

  export class updateuserservice{
    private baseurl =  'https://chiefnet-stg-api.yavar.in';

    constructor(private http:HttpClient,private otpservice:otpservice){}

    createuser(user:{user:{name:string,email:string,role:string,organization_id:string}}): Observable<any>{
      const AccessToken=this.otpservice.getAccessToken();

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
                                       .set('Authorization', `${AccessToken}`);
      return this.http.post<any>(`${this.baseurl}/v1/users`,user,{headers})
    }

    getorgan(){
      const AccessToken=this.otpservice.getAccessToken();

      const headers = new HttpHeaders().set('Authorization', `${AccessToken}`);
      return this .http.get <any>(`${this.baseurl}/v1/organizations/list`,{headers})
    }

   
  }