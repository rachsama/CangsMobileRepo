import { Component } from '@angular/core';
import { NavController, NavParams, Nav, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { OrderPage } from '../../pages/order/order';
import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';
import { SharedService } from '../../app/app.service';
import { LoginPage } from '../../pages/login/login';

@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {
    public item: any=[];
    selected:any = [];

    categoryOptions: any = [ "Condiments", "Miscellaneous", "Dairy Products", "Non-chilled Beverages", "Toiletries", "Dry Goods" ];

    constructor(private shared: SharedService, private toastCtrl: ToastController, private network: Network, private log: OrderService ,public navCtrl: NavController, public navParams: NavParams) {
        //this.log.getItem().then(res => {
		//    this.item=res;
        //console.log(this.item);
        //});
        this.categoryOptions;
        console.log(this.categoryOptions);

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
                this.navCtrl.setRoot(LoginPage);
				});
//Network
    }

    gotoOrder(cat){
		console.log("to order");
        console.log(cat)
		this.navCtrl.push(OrderPage,{
			category: cat,
		});
	}

}