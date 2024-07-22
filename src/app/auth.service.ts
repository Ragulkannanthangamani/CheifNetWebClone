import { HttpClient, HttpHeaders } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class athuservice {
    private baseurl =  'https://chiefnet-stg-api.yavar.in';
    constructor(private http :HttpClient ){

    }

    signIn(user: { user: { email: string, password: string, remember_me: boolean } }): Observable<any> {
        const apiurl =`${this.baseurl}/v1/signin`;
         const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiurl,  user ,{ headers });
      }
}

