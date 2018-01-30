import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { HistoryPage } from '../../pages/history/history';


@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  selected:any = [];

  constructor(public navCtrl: NavController, public navParam: NavParams) {
    console.log(this.navParam.get('data1'));
    console.log(this.navParam.get('data2'));
  }
}