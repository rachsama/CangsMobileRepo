import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class OrderService{
    post: any;
    private _loginUrl =  'http://192.168.0.24:1025/item/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http ){
        console.log("GetItems");
    }
     
    getItem(){

        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/item/all').map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
     )};
     getHistory(){
        return this._http.get(this._apiUrl + "/orders/getHistory/" +10016).map((res:Response) => res.json());
     }
     makeOrder(){
            this._http.get(this._apiUrl+'/item/all').map(res => res.json()).subscribe(data => {
            this.post = data;        
            console.log(this.post);
        });
    }   
     getDetails(id:any){
            return new Promise(resolve => {
                var url = this._apiUrl + "/orderDetails/returnOrderDetails/"+ id;         
                this._http.get(url).map(res => res.json()).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
                    console.log(this.post);
            });
        }
    )};
    get1Item(id:any){
            return new Promise(resolve => {
                var url = this._apiUrl + "/item/returnItem/"+ id;         
                this._http.get(url).map(res => res.json()).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
                    console.log(this.post);
            });
        }
    )};
     get1Customer(customer:any){
         return new Promise(resolve => {      
            this._http.get(this._apiUrl + "/customer/getCustomer/"+customer).map(res => res.json()).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
                    console.log(this.post);
             });
          }
     )};
}
