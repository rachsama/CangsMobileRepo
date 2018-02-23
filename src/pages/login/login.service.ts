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
        })

        console.log(user)
        console.log(fpasscode)
        console.log(cpass)
        this._http.post(this._apiUrl + "/template/addTemplate",JSON.stringify(user, fpasscode, cpass), reqopt).subscribe(function(res){
            var num;
            num=res;
            alert("Your New Password is " + cpass);
        });
    };

    /* makeTemplate(data,tempgetData){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        console.log(data);
        this._http.post(this._apiUrl + "/template/addTemplate",JSON.stringify(data), reqopt).subscribe(function(res){
            var num;
            num=res;
            TemplateService.templateID=num._body;
            console.log(TemplateService.templateID);
            alert("The Template has been Successfully Updated!");
        });

        setTimeout(() => {
            console.log(tempgetData);
            for(var i=0; i<tempgetData.length; i++){
                console.log(TemplateService.templateID);
                this.sendTemplateDetails.push({
                templateID: TemplateService.templateID,
                itemID: tempgetData[i].itemID,
                temdeQuantity: '0'
            });
            console.log(this.sendTemplateDetails[i]);
            this._http.post(this._apiUrl + "/templatedetails/addTemplateDetails",JSON.stringify(this.sendTemplateDetails[i]), reqopt).subscribe(function(res){
            this.templateID=res;
            tempgetData.length = 0;
            alert("The TemplateDetail has been Successfully Updated!");
            });
            }
        }, 3000)
        this.sendTemplateDetails.length = 0;
     }*/

}
