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
		 console.log(this.navParams.get('check'))//delete
		console.log(this.navParams.get('templateID'));
		console.log(this.navParams.get('templateName'));
		this.categoryOptions;
       console.log(this.categoryOptions);//delete

//Network
				this.network.onConnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is online',
						duration: 2500,
					}).present();
				});

				this.network.onDisconnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is offline',
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
		if(this.navParams.get('check')==true){
			this.navCtrl.push(TemplatePage,{
				category: cat,
				check: true,
				templateID: this.navParams.get('templateID'),
				templateName: this.navParams.get('templateName')
			});
		}
	
		else{
			this.navCtrl.push(TemplatePage,{
				category: cat,
			});
		}
	}

}