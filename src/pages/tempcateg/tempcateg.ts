import { Component } from '@angular/core';
import { NavController, NavParams, Nav, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { TemplatePage } from '../../pages/template/template';
import { SharedService } from '../../app/app.service';
import { LoginPage } from '../../pages/login/login';

@Component({
    selector: 'page-tempcateg',
    templateUrl: 'tempcateg.html'
})
export class TempCategPage {
    public item: any=[];
    selected:any = [];

    categoryOptions: any = [ "Condiments", "Miscellaneous", "Dairy Products", "Non-chilled Beverages", "Toiletries", "Dry Goods" ];

    constructor(private network: Network, private shared: SharedService, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
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

    gotoTemplate(cat){
		console.log("to order");
        console.log(cat)
		this.navCtrl.push(TemplatePage,{
			category: cat,
		});
	}

}