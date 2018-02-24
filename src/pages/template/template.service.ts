import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { SharedService } from '../../app/app.service';

@Injectable()
export class TemplateService{
    public sendTemplateDetails: any=[];
    public static templateID: any;
    post: any;
    success: boolean=false;
    temdeQuantity: number;
    private _loginUrl =  'http://192.168.0.24:1025/item/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http, public shared: SharedService ){
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
    makeTemplate(data,tempgetData){
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
            this.success = true;
            });
            }
        }, 3000)
        this.sendTemplateDetails.length = 0;
        //mao ni ang start
        if(this.success == true){
            alert("Your Template has been Successfully Set!");
        }
        //end
    }
}
