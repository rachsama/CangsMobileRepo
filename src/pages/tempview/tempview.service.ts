import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { LoginService } from '../../pages/login/login.service';
import { SharedService } from '../../app/app.service';

@Injectable()
export class TempViewService{
    public sendOrderDetails: any=[];
    public static templateID: any;
    post: any;
    public data: any=[];
    private _loginUrl =  'http://10.8.86.90:1025/template/all';
    private _apiUrl =  'http://10.8.86.90:1025';//http://192.168.0.24:1025
    constructor(private _http: Http, public shared:SharedService ){
        console.log("getTemplate");
        

    }
     
    getTemplate(){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/template/returnCustomerID/'+ this.shared.getUserName() ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};

    deleteTemplate(templateID){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
        headers: headers
        })

        console.log(templateID);
        if (typeof templateID === "number"){
            console.log(templateID);
            this.data.push({
                "templateID": templateID
            });
            console.log(this.data);
        }
        return new Promise(resolve => {
            this._http.post(this._apiUrl + '/template/deleteTemplate/',JSON.stringify(this.data[0]), reqopt ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
             alert("Template has been Successfully Deleted!")
            this.data.pop();
            });
        })
    };
}