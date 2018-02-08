import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderPage } from '../../pages/order/order';
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
  curDate: String = new Date().toISOString();
  total: number;

  constructor( public navCtrl: NavController, public navParams: NavParams) {
      for(var i=0; i<this.navParams.get('cartData').length; i++){
        this.orderData[i] = this.navParams.get('cartData')[i];
      }

    console.log(this.navParams.get('cartData')); 
    console.log(this.navParams.get('data1')); 
  }

  ionViewDidLoad() {
  }

  addOrder(delLocation, packaging, delTime, remarks){
      for(var i=0; i<this.orderData.length; i++){
        this.total += this.orderData[i].itemPrice * this.orderData[i].quantity; 
      }    console.log(this.total);
      
      this.sendOrder.push({
      orderDate: this.curDate,
      orderTotal: this.total,
      orderStatus: 'pending',
      orderRemarks: remarks,
      location: delLocation,
      orderTime: delTime,
      packaging: packaging,
      customerID: this.navParams.get('data1'),
    });
    console.log(this.sendOrder)
    
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
