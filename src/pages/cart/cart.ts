import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';
import { LoginService } from '../../pages/login/login.service';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public item: any=[];
  public orderData: any=[];
  public sendOrder: any=[];
  public sendOrderDetails: any=[];
  //curDate: String = new Date().toISOString();
  total: number=0;
  coh: number;

  constructor( public navCtrl: NavController, public navParams: NavParams, public ord: OrderService, public log:LoginService) {
      for(var i=0; i<this.navParams.get('cartData').length; i++){
        this.orderData[i] = this.navParams.get('cartData')[i];
      }

    console.log(this.navParams.get('cartData')); 
  }

  ionViewDidLoad() {
  }

  addOrder(delLocation, packaging, delTime, remarks, coh){
      for(var i=0; i<this.orderData.length; i++){
        console.log(this.orderData[i].quantity)
        this.total += this.orderData[i].itemPrice * this.orderData[i].quantity; 
      }    console.log(this.total);
      
      let time = new Date();
        console.log(time);
        let mm =time.getMonth();
        let dd =time.getDate();
        let yy =time.getFullYear();
        let hh =time.getHours();
        let ss =time.getSeconds();
        let min =time.getMinutes();
        let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + min + ":" + ss;

      this.sendOrder.push({
      "orderDate": timestamp,
      "orderTotal": this.total,
      "orderStatus": 'pending',
      "orderRemarks": remarks,
      "location": delLocation,
      "orderTime": delTime,
      "packaging": packaging,
      "customerID": LoginService.customerID,
      "cashTendered": coh,
    });
    console.log(this.sendOrder);
    this.ord.makeOrder(this.sendOrder[0]);
    
    /*this.sendOrderDetails.push({
      ordetQuantity: quantity,
      ordetPrice: itemPrice,
      ordetSubtotal: total,
      orderID: ,
      itemID: itemID,
      itemName: itemName,
      itemDescription: itemDescription
    });*/
        //date total status(pending) remarks location ordertime packaging cusid
  }

}
