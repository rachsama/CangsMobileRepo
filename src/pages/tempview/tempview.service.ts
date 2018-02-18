import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { LoginService } from '../../pages/login/login.service';


@Injectable()
export class TempViewService{
    public sendOrderDetails: any=[];
    public static templateID: any;
    post: any;
    private _loginUrl =  'http://192.168.0.24:1025/template/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http ){
        console.log("getTemplate");
        

    }
     
    getTemplate(){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/template/returnCustomerID/'+ 10016 /*LoginService.customerID*/ ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};
}
