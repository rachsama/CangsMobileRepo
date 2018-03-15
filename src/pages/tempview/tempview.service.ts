import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { LoginService } from '../../pages/login/login.service';
import { SharedService } from '../../app/app.service';
import { LoadingController } from 'ionic-angular';/*loader*/
@Injectable()
export class TempViewService{
    public sendOrderDetails: any=[];
    public static templateID: any;
     public sendDetails: any=[];
    post: any;
    public data: any=[];
    private _loginUrl =  'http://192.168.1.219:1025/template/all';
    private _apiUrl =  'http://192.168.1.219:1025';
    constructor(private _http: Http, public shared:SharedService,public loadingCtrl: LoadingController ){
        console.log("getTemplate");
        

    }
     
    getTemplate(){
      
            return this._http.get(this._apiUrl +  '/template/returnCustomerID/' + this.shared.getUserName() ).map(res => res.json());
    }
/*
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
        //create loader
        //let loading = this.loadingCtrl.create({
        //    content: 'Please wait...',
        //    cssClass: "loader"
        //});
        //loading.present();
        //
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
    editTemp(data){
        let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         let reqopt = new RequestOptions({
             headers: headers
         })
         console.log(data);
 
 
         this._http.post(this._apiUrl + '/template/editTemplate',JSON.stringify(data[0]), reqopt ).subscribe(data => {
             this.post = data;
             console.log(this.post);
             this.data.pop();
         });
 
         
     }
 
     giveTempID(templateID){
         return new Promise(resolve => {
             this._http.get(this._apiUrl + '/template/getTempDetails/' + templateID ).map(res => res.json()).subscribe(data => {
             this.post = data;
             resolve(this.post);
             console.log(this.post);
         });
         })
     }
 
     delTempDe(item){
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         let reqopt = new RequestOptions({
             headers: headers
         })
         
          return new Promise(resolve => {      
             this._http.post(this._apiUrl + '/template/deleteTempDetails',JSON.stringify(item), reqopt ).subscribe(data => {
                     this.post = data;        
                     resolve(this.post);
                     console.log(this.post);
              });
           })
     };
 
     addEditedTemDe(tempgetData, templateID){
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         let reqopt = new RequestOptions({
             headers: headers
         })
 
         //create loader
         let loading = this.loadingCtrl.create({
             content: 'Please wait...',
             cssClass: "loader"
         });
 
         loading.present();
         //
         setTimeout(() => {
             console.log(tempgetData);
             for(var i=0; i<tempgetData.length; i++){
                 this.sendDetails.push({
                 templateID: templateID,
                 itemID: tempgetData[i].itemID,
                 temdeQuantity: '0'
             });
             console.log(this.sendDetails[i]);
             this._http.post(this._apiUrl + "/templatedetails/addTemplateDetails",JSON.stringify(this.sendDetails[i]), reqopt).subscribe(function(res){
             this.templateID=res;
             tempgetData.length = 0;
             });
         }
         loading.dismiss(); // loader dismiss
         alert("Your template has been successfully edited!");
         }, 3000)
         this.sendDetails.length = 0;
     }
 
 
     /*editDel(data){
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         let reqopt = new RequestOptions({
             headers: headers
         })
 
         console.log(data);
         this._http.post(this._apiUrl   '/template/deleteTemplateDetails',JSON.stringify(data), reqopt ).subscribe(data => {
             this.post = data;
         });
 
         return new Promise(resolve => {
             this._http.get(this._apiUrl + '/templatedetails/deleteTemplateDetails/').map(res => res.json()).subscribe(data => {
             this.post = data;        
             resolve(this.post);
             console.log(this.post);
         });
         }
     )};*/
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
        //create loader
        //let loading = this.loadingCtrl.create({
        //    content: 'Please wait...',
        //    cssClass: "loader"
        //});
        //loading.present();
        //
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

    editTemp(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        console.log(data);


        this._http.post(this._apiUrl + '/template/editTemplate',JSON.stringify(data[0]), reqopt ).subscribe(data => {
            this.post = data;
            console.log(this.post);
            this.data.pop();
        });

        
    }

    giveTempID(templateID){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/template/getTempDetails/' + templateID ).map(res => res.json()).subscribe(data => {
            this.post = data;
            resolve(this.post);
            console.log(this.post);
        });
        })
    }

    delTempDe(item){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        
         return new Promise(resolve => {      
            this._http.post(this._apiUrl + '/template/deleteTempDetails',JSON.stringify(item), reqopt ).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
                    console.log(this.post);
             });
          })
    };

    addEditedTemDe(tempgetData, templateID){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        //create loader
        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            cssClass: "loader"
        });

        loading.present();
        //
        setTimeout(() => {
            console.log(tempgetData);
            for(var i=0; i<tempgetData.length; i++){
                this.sendDetails.push({
                templateID: templateID,
                itemID: tempgetData[i].itemID,
                temdeQuantity: '0'
            });
            console.log(this.sendDetails[i]);
            this._http.post(this._apiUrl + "/templatedetails/addTemplateDetails",JSON.stringify(this.sendDetails[i]), reqopt).subscribe(function(res){
            this.templateID=res;
            tempgetData.length = 0;
            });
        }
        loading.dismiss(); // loader dismiss
        alert("Your template has been successfully edited!");
        }, 3000)
        this.sendDetails.length = 0;
    }


    /*editDel(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        console.log(data);
        this._http.post(this._apiUrl + '/template/deleteTemplateDetails',JSON.stringify(data), reqopt ).subscribe(data => {
            this.post = data;
        });
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/templatedetails/deleteTemplateDetails/').map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};*/

}