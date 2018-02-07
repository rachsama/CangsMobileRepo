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

  constructor( public navCtrl: NavController, public navParams: NavParams) {
      for(var i=0; i<this.navParams.get('cartData').length; i++){
        this.orderData[i] = this.navParams.get('cartData')[i];
      }

    console.log(this.navParams.get('cartData')); 
  }

  ionViewDidLoad() {
  }

  addOrder(){ 
  }

}
