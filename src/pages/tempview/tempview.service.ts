import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class TempViewService{
    public sendOrderDetails: any=[];
    public static templateID: any;
    post: any;
    private _loginUrl =  'http://192.168.0.24:1025/template/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(private _http: Http ){
        console.log("getTemplate");
        

    }
     
    getTemplate(){

        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/template/all').map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
     )};

    /*makeOrder(data,orderData){

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
            console.log(this.orderID);
            alert("The Order has been Successfully Updated!");
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
            console.log(this.sendOrderDetails[i]);
            this._http.post(this._apiUrl + "/orderdetails/addOrderDetails",JSON.stringify(this.sendOrderDetails[i]), reqopt).subscribe(function(res){
            this.orderID=res;
            alert("The OrderDetail has been Successfully Updated!");
            });
            }
        }, 3000)
        
    }*/
}
