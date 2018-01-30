import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

    constructor(public navCtrl: NavController, public navParam: NavParams) {
      console.log(this.navParam.get('data1'));
      console.log(this.navParam.get('data2'));
  }

}
