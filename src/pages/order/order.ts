import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  selected:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
  }
}