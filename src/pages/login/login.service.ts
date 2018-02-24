import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class LoginService{
    post: any;
    data: any=[];
    newPass: any;
    public static customerID;
    customer:any=[];
    private _loginUrl =  'http://192.168.0.24:1025/customer/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http, private _md5: Md5 ){
        console.log("LOGIN");
        

    }
     
    getCustomer(){

        return new Promise(resolve => {
          this._http.get('http://192.168.0.24:1025/customer/all').map(res => res.json()).subscribe(data => {
          this.post = data;
          resolve(this.post);
          console.log(this.post);
        });
        }
     )};

    forgotPass(user, fpasscode, cpass){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        });
        
        this.newPass = Md5.hashStr(cpass);
        console.log(user);
        console.log(fpasscode);
        console.log(cpass);
        /*
        if(fpasscode.length == 11){
            this.data.push({
                "customerID": user,
                "number": fpasscode,
                "cusPassword": cpass
            });
                console.log(user);
                console.log(this.newPass);

        }
        else {
        this.data.push({
            "customerID": user,
            "verificationCode": fpasscode,
            "cusPassword": this.newPass
        });
        
    }*/

//09276405170
        this._http.post(this._apiUrl + "/customer/returnCusID/"+user, reqopt).map(res => res.json()).subscribe(data =>{
            /*var num;
            num=res;
            console.log(this.data[0]);
            if(num._body = true){   
                alert("Your New Password is " + cpass);
            }
            else if(num._body = false){
                alert("There has been an error. Try Again");
            }*/
           
            console.log(data);
            this.customer=data;
            console.log(this.customer[0]);
        });
        setTimeout(() => {
                console.log(this.customer);//4c54133f-d317
                if(this.customer[0].verificationCode == fpasscode)
                {
                    this.customer[0].cusPassword=Md5.hashStr(cpass);
                    console.log(this.customer[0]);
                    let code =Md5.hashStr(cpass);
                    this.customer[0].cusPassword=code;
                    this.data.push({
                        customerID:this.customer[0].customerID,
                        cusPassword:this.customer[0].cusPassword,
                        number:this.customer[0].number,
                        address:this.customer[0].address,
                        cusLastName:this.customer[0].cusLastName,
                        cusFirstName:this.customer[0].cusFirstName,
                        cusMiddleName:this.customer[0].cusMiddleName,
                        verificationCode:this.customer[0].verificationCode
                    });
                    this._http.post(this._apiUrl + "/customer/forgotPassword",JSON.stringify(this.data[0]), reqopt).subscribe(function(res){
                        alert("Your New Password is " + cpass);
                    });
                }
                else if(this.customer[0].number == fpasscode)
                {
                    let code =Md5.hashStr(cpass);
                    this.customer[0].cusPassword=code;
                    this.data.push({
                        customerID:this.customer[0].customerID,
                        cusPassword:this.customer[0].cusPassword,
                        number:this.customer[0].number,
                        address:this.customer[0].address,
                        cusLastName:this.customer[0].cusLastName,
                        cusFirstName:this.customer[0].cusFirstName,
                        cusMiddleName:this.customer[0].cusMiddleName,
                        verificationCode:this.customer[0].verificationCode
                    });
                    console.log(this.data[0]);
                    console.log(this.customer[0]);
                    this._http.post(this._apiUrl + "/customer/forgotPassword",JSON.stringify(this.data[0]), reqopt).subscribe(function(res){
                        alert("Your New Password is " + cpass);
                    });
                }
                else{
                    alert("There has been an Error. Please Try Again.");
                }
                this.customer.pop();
               this.data.pop();
               this.newPass = null;
        }, 3000)
    };

}
