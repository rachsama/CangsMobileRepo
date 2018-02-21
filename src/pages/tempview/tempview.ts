import { Component } from '@angular/core';
import { NavController, NavParams, Nav, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { LoginService } from '../../pages/login/login.service';
import { TempViewService } from '../../pages/tempview/tempview.service';
import { SeeTempPage } from '../../pages/seetemp/seetemp';
import { LoginPage } from '../../pages/login/login';
import { SharedService } from '../../app/app.service';

@Component({
  selector: 'page-tempview',
  templateUrl: 'tempview.html'
})
export class TempViewPage {
  public item: any=[];
  selected:any = [];

  constructor(private shared: SharedService, private network: Network, public toastCtrl:ToastController ,private tempv: TempViewService ,public navCtrl: NavController, public navParams: NavParams) {
    this.tempv.getTemplate().then(res => {
		  this.item=res;
      console.log(this.item);
    });
    console.log(this.item);
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

  seeTemplate(templateID){
    this.navCtrl.push(SeeTempPage, {
      templateID: templateID
    })
    console.log(templateID);
  }
  

}