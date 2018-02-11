import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class LoginService{
    post: any;
    public static customerID;
    private _loginUrl =  'http://192.168.0.24:1025/customer/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http ){
        console.log("LOGIN");
        

    }
     
    getCustomer(){

        return new Promise(resolve => {
          this._http.get(this._apiUrl+'/customer/all').map(res => res.json()).subscribe(data => {
          this.post = data;
          resolve(this.post);
          console.log(this.post);
        });
        }
     )};
     getCustomers(){
        return this._http.get(this._apiUrl + "/customer/all").map((res:Response) => res.json());
     }
     get1Customer(id:any){
        
          return this._http.get(this._apiUrl +"/customer/getCustomer/"+id).map(res => res.json())
     }
     getCustomerID(id){

            LoginService.customerID=id;
     }
     editCustomer(data){
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        this._http.post(this._apiUrl + "/customer/editCustomer",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
           // alert("The Customer has been Successfully Updated!");
        });
     }
     
}
