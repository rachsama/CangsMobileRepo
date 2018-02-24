import { Component } from '@angular/core';
import { NavController, NavParams, Nav, ToastController } from 'ionic-angular';
import { UUID } from 'angular2-uuid';

import { Network } from '@ionic-native/network';
import { OrderPage } from '../../pages/order/order';
import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';
import { SharedService } from '../../app/app.service';
import { LoginPage } from '../../pages/login/login';
import { LoginService } from '../../pages/login/login.service';
@Component({
    selector: 'page-forgotpass',
    templateUrl: 'forgotpass.html'
})
export class ForgotPassPage {
    public cus: any=[];
    selected:any = [];
    cpass: string;


    constructor(private log: LoginService, private shared: SharedService, private toastCtrl: ToastController, private network: Network, public navCtrl: NavController, public navParams: NavParams) {
                this.log.getCustomer().then(res =>{
					this.cus=res;
				});
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

	randPass(user, fpasscode){
        console.log(user);
        console.log(fpasscode);
        for (var i=0; i<this.cus.length; i++){
            if(user == this.cus[i].customerID){
                if((fpasscode == this.cus[i].number) || (fpasscode == this.cus[i].verificationCode)){
                    let uuid = UUID.UUID();
                    this.cpass=uuid.slice(0,-28);

                    this.log.forgotPass(user, fpasscode, this.cpass)
                    this.navCtrl.setRoot(LoginPage);
                }
                //else
            }
        }
    }
        
    
}