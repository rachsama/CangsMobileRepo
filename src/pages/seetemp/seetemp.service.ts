import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class SeeTempService{
    public sendOrderDetails: any=[];
    public static templateID: any;
    post: any;
    private _loginUrl =  'http://192.168.0.24:1025/templatedetails/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http){
        console.log("getTemplate");
        

    }

    getTemplateDetails(templateID){
        console.log(templateID);
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/templatedetails/returnTemplateID/' + templateID).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};
}