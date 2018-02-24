import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { TempViewService } from '../../pages/tempview/tempview.service';
import { SeeTempPage} from '../../pages/seetemp/seetemp';
import { OrderPage } from '../../pages/order/order';
import { SharedService } from '../../app/app.service';

@Injectable()
export class OrderService{
    public sendOrderDetails: any=[];
    public static orderID: any;
    public refresh: any=[];
    public cartData: any=[];
    public data: any=[];
    success: boolean=false;
    post: any;
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

    getTempItem(itemID){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/item/returnItem/' + itemID ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};

    getCategoryItem(category){

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
        headers: headers
        })

        console.log(category);
        if (typeof category === "string"){
            console.log(category);
            this.data.push({
                "category": category
            });
            console.log(this.data);
        }
        return new Promise(resolve => {
            this._http.post(this._apiUrl + '/item/returnCategory/',JSON.stringify(this.data[0]), reqopt ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
            this.data.pop();
            });
        })
        
        
    };


    
    makeOrder(data,orderData){
        this.shared.cleanCart();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        console.log(data);
        this._http.post(this._apiUrl + "/orders/addOrder",JSON.stringify(data), reqopt).subscribe(function(res){
            var num;
            num=res;
            OrderService.orderID=num._body;
            console.log(OrderService.orderID);
            
        });

        setTimeout(() => {
            console.log(orderData);
            for(var i=0; i<orderData.length; i++){
                console.log(OrderService.orderID);
                this.sendOrderDetails.push({
                ordetQuantity: orderData[i].quantity,
                ordetPrice: orderData[i].itemPrice,
                ordetSubtotal: orderData[i].itemPrice * orderData[i].quantity,
                orderID: OrderService.orderID,
                itemID: orderData[i].itemID,
                itemName: orderData[i].itemName,
                itemDescription: orderData[i].itemDescription
            });
            
            console.log(this.sendOrderDetails);
            this._http.post(this._apiUrl + "/orderdetails/addOrderDetails",JSON.stringify(this.sendOrderDetails[i]), reqopt).subscribe(function(res){
            this.orderID=res;
            orderData.length = 0;
            console.log(orderData);
            this.success = true;
            });
            }
        }, 3000)
        this.sendOrderDetails.length = 0;
        //mao ni ang start
        if(this.success == true){
            alert("Your Order has been Sent!");
        }
        //end
    }
}
