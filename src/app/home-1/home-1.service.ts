import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { otpservice } from "../home/otp.service";

interface User {
   
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
    users: User[];
    pagination: Pagination;
  }
  


@Injectable({
    providedIn: 'root'
})

export class home1service{
   private userlist ='userlist';
    private baseurl =  'https://chiefnet-stg-api.yavar.in';

    constructor(private http:HttpClient ,private otpservice:otpservice){
 }
 getUsers(page:number,perPage:number): Observable<ApiResponse> {
  const refreshtoken=this.otpservice.getRefreshToken();
  const AccessToken=this.otpservice.getAccessToken();
  console.log(refreshtoken);
  console.log(AccessToken);
  if (!AccessToken) {
    throw new Error('No access token found');
  }

  const headers = new HttpHeaders()
    .set('Authorization', `${AccessToken}`);

    let params = new HttpParams();

    // params = params.append('q', 'Prakash')
    params = params.append('visible_columns', 'name,email,role')
                    .set('page',page.toString())
                    .set('perPage',perPage.toString());

    console.log(params, 'logging params');
 return this.http.get<ApiResponse>(`${this.baseurl}/v1/users`, { headers:headers,params });
  }

  savelocalstorage(userList:any):void{
    console.log(userList);
     localStorage.setItem(this.userlist,userList);
  }

  getlocalstorage():any[] | null{
    let userjson=localStorage.getItem(this.userlist)
   
  if (userjson !== null) {
    return JSON.parse(userjson);
  } else {
    return null;
  }
}

updateuserbyid(id:number,user:{user:{name:string}}): Observable<any>{
      
  const AccessToken=this.otpservice.getAccessToken();
  const headers = new HttpHeaders().set('Authorization', `${AccessToken}`);
 
  return this.http.put<any>(`${this.baseurl}/v1/users/${id}`,user,{headers })
 
}
deleteuser(ids:string):Observable<any>{
  const AccessToken=this.otpservice.getAccessToken();
  let params = new HttpParams().set('ids', ids);
  const headers = new HttpHeaders()
  .set('Authorization', `${AccessToken}`);
return this.http.delete<any>(`${this.baseurl}/v1/users`,{headers,params})
}
  }

