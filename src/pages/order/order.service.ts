import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';import { MenuController } from 'ionic-angular';

import { TempViewService } from '../../pages/tempview/tempview.service';
import { SeeTempPage} from '../../pages/seetemp/seetemp';
import { HistoryPage} from '../../pages/history/history';
import { SharedService} from '../../app/app.service';
import { LoadingController } from 'ionic-angular';
@Injectable()
export class OrderService{
    public sendOrderDetails: any=[];
    public static orderID: any;
    post: any;
    private _loginUrl =  'http://192.168.1.219:1025/item/all';
    private _apiUrl =  'http://192.168.1.219:1025';
    public data: any=[];
    constructor(private _http: Http, 
                public shared:SharedService,
                 public menu :MenuController,
                 public loadingCtrl: LoadingController,
                 ){
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
    getOrderStatus(id){
        return this._http.get(this._apiUrl+'/updateOrderStatus/returnOrderID/' + id).map(res => res.json());
    }
     getHistory(){
        return this._http.get(this._apiUrl + "/orders/getHistory/" +this.shared.getUserName()).map((res:Response) => res.json());
     }
     getStored(){
        return this._http.get(this._apiUrl + "/orders/returnQuantityStored/").map((res:Response) => res.json());
     }

    getTempItem(itemID){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/item/returnItem/' + itemID ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};
    getDate(){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/orders/returnDate/').map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};


    
    makeOrder(data,orderData){
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
        //    alert("The Order has been Successfully Updated!");
        });
        //create loader
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Please wait...',
            cssClass: "loader"
        });

        loading.present();
        //
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
            //alert("The OrderDetail has been Successfully Updated!");
            });
            }
            //alert("Your order has been sent!");
            loading.dismiss(); // loader dismiss
        }, 3000)
        this.sendOrderDetails.length = 0;
        setTimeout(() => {
            this.shared.cleanCart();
        }, 2000)
    }
    get1Customer(customer:any){
         return new Promise(resolve => {      
            this._http.get(this._apiUrl + "/customer/getCustomer/"+customer).map(res => res.json()).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
              //      console.log(this.post);
             });
          }
    )};
     get1Item(id:any){
            return new Promise(resolve => {
                var url = this._apiUrl + "/item/returnItem/"+ id;         
                this._http.get(url).map(res => res.json()).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
            //        console.log(this.post);
            });
        }
    )};
     getDetails(id:any){
            return new Promise(resolve => {
                var url = this._apiUrl + "/orderDetails/returnOrderDetails/"+ id;         
                this._http.get(url).map(res => res.json()).subscribe(data => {
                    this.post = data;        
                    resolve(this.post);
            //        console.log(this.post);
            });
        }
    )};
     getCategoryItem(category){
        this.data.pop();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

      //  console.log(category);
        
        //    console.log(category);
            this.data.push({
                "category": category
            });
           // console.log(this.data[0]);
         
        return this._http.post(this._apiUrl + '/item/returnCategory/',JSON.stringify(this.data[0]), reqopt ).map(res => res.json());
       
     }
     getDeliveryDate(id){
        return new Promise(resolve => {
            this._http.get(this._apiUrl + '/orders/returnOrderID/' + id ).map(res => res.json()).subscribe(data => {
            this.post = data;        
            resolve(this.post);
            console.log(this.post);
        });
        }
    )};
}
