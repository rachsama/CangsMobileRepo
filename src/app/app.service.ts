import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class SharedService{
    user:any;
    private _loginUrl =  'http://192.168.0.24:1025/item/all';
    private _apiUrl =  'http://192.168.0.24:1025';
     constructor() {
        
    }
  
    setUserName(userName) {
        this.user = userName;    
    }
  
    getUserName() {
        return this.user;
    }  
}