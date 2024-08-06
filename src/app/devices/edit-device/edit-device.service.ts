import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root'
})

export class editdeviceservice {
    private baseurl =  'https://chiefnet-stg-api.yavar.in';
    constructor(){ }

    SaveEditDevice(device:{device:{name:string,organization_id:string,type:string,latitude:string,longitude:string,location:string,incharge_name:string,incharge_email:string,incharge_mobile_no:string,description:string}}){}
}