import { Component } from '@angular/core';
import { NavController, NavParams, Nav, MenuController } from 'ionic-angular';

import { OrderPage } from '../../pages/order/order';
import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';

import { ToastController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { SharedService } from '../../app/app.service';
import { Network } from '@ionic-native/network';

@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {
    public item: any=[];
    selected:any = [];

    categoryOptions: any = [ "Condiments", "Food", "Drinks", "Others" ];

    constructor( private log: OrderService ,
                public navCtrl: NavController,
                public menu :MenuController,
                public toastCtrl: ToastController,
               private network: Network,
               public shared:SharedService,
                 public navParams: NavParams) {
                      //Network
                      console.log("CONSTRUCTED");
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
        this.navCtrl.setRoot(LoginPage);
        });
      //Network
        //this.log.getItem().then(res => {
		//    this.item=res;
        //console.log(this.item);
        //});
        this.categoryOptions;
        console.log(this.categoryOptions);
        this.menu.enable(true,"myMenu");
    }

    gotoOrder(cat){
		console.log("to order");
        console.log(cat)
		this.navCtrl.push(OrderPage,{
			category: cat,
		});
	}
     ionViewWillEnter(){
        console.log("ENTERD");
        this.menu.enable(true,"myMenu");
    }

}