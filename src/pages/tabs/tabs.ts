import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    TabOrderRoot = 'OrderPage';
    TabHistoryRoot = 'HistoryPage';
    myIndex: number;

    constructor(public navCtrl: NavController, public navParam: NavParams) {
        this.myIndex = navParam.data.tabIndex || 0;
    }
}