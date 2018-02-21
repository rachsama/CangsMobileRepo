import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { OrderService } from '../../pages/order/order.service';
import { LoginService } from '../../pages/login/login.service';
import { OrderPage } from '../../pages/order/order';
import { CategoryPage } from '../../pages/category/category';
import { SharedService } from '../../app/app.service';
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
  packaging: string='Plastic';
  ngOnInit () {
    this.packaging = 'Plastic';
  }
  total: number=0;
  coh: number;

  constructor(private toastCtrl: ToastController, private network: Network, public navCtrl: NavController, public navParams: NavParams, private shared: SharedService, public ord: OrderService, public log:LoginService) {
      for(var i=0; i<this.shared.getCart().length; i++){
        this.orderData[i] = this.shared.getCart()[i];
      }

    console.log(this.shared.getCart()); 

//Network
				this.network.onConnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is Online',
						duration: 2500,
					}).present();
				});

				this.network.onDisconnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is Offline',
						duration: 2500,
					}).present();
          this.shared.clearUserName();
          this.navCtrl.setRoot(CategoryPage);
				});
//Network

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
      "customerID": '10016'/*LoginService.customerID*/,
      "cashTendered": coh,
    });
    console.log(this.sendOrder);
    this.ord.makeOrder(this.sendOrder[0],this.orderData);

    this.navCtrl.setRoot(CategoryPage)
  }

  refreshCart(){
    this.shared.cleanCart();
    this.navCtrl.setRoot(CategoryPage);
  }

}
