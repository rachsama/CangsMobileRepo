import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class ListService{
    post: any;
    private _loginUrl =  'http://192.168.0.24:1025/item/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http ){
        console.log("LOGIN");
        

    }
     
    getCustomer(){

        return new Promise(resolve => {
          this._http.get('http://192.168.0.24:1025/item/all').map(res => res.json()).subscribe(data => {
          this.post = data;
          resolve(this.post);
          console.log(this.post);
        });
        }
     )};
     
}
