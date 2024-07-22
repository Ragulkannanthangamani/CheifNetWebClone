import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class otpservice{

    private baseurl =  'https://chiefnet-stg-api.yavar.in';
    private refreshTokenKey= 'refresh_token'
    private accessTokenKey = 'access_token';
   

    constructor(private http :HttpClient ){
         
    }
    
    verifyotp(user: { user: { otp: string, email: string} }): Observable<any> {
        const apiurl =`${this.baseurl}/v1/verify_otp`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiurl,  user ,{ headers ,observe: 'response' });
    }

  
    setAccessToken(Authorization: string ): void {
      localStorage.setItem(this.accessTokenKey,Authorization);
    }
  
    getAccessToken(): string | null {
      return localStorage.getItem(this.accessTokenKey);
    }
    setRefreshToken(RefreshToken:string): void {
      localStorage.setItem(this.refreshTokenKey,RefreshToken);
    }
  
    getRefreshToken(): string | null {
      return localStorage.getItem(this.refreshTokenKey);
    }
  }