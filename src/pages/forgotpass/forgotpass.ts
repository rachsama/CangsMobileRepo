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

import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";

@Component({
    selector: 'page-forgotpass',
    templateUrl: 'forgotpass.html'
})
export class ForgotPassPage {
    public cus: any=[];
    selected:any = [];
    cpass: string;
    success: boolean=false;
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;

    constructor(private log: LoginService, private shared: SharedService, private toastCtrl: ToastController, private network: Network, public navCtrl: NavController, public navParams: NavParams) {
                this.log.getCustomer().subscribe(res =>{
					this.cus=res;
				});
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

	randPass(user, fpasscode){
        console.log(user);
        console.log(fpasscode);
        for (var i=0; i<this.cus.length; i++){
            if(user == this.cus[i].customerID){
                this.success = true;
                if((fpasscode == this.cus[i].number) || (fpasscode == this.cus[i].verificationCode)){
                    let uuid = UUID.UUID();
                    this.cpass=uuid.slice(0,-28);

                    this.log.forgotPass(user, fpasscode, this.cpass)
                    this.navCtrl.setRoot(LoginPage);
                }
                else if((fpasscode != this.cus[i].number) || (fpasscode != this.cus[i].verificationCode)){
                    this.toastCtrl.create({
						message: 'Your number or verification code is incorrect. Please try again.',
						duration: 2500,
					}).present();
                }
            }
        }
        if((user == "" || user == null) && (fpasscode == "" || fpasscode == null))
        {
            this.toastCtrl.create({
				message: 'Please fill up the forgot password details.',
				duration: 2500,
			}).present();
        }
        else if(fpasscode == "" || fpasscode == null)
        {
            this.toastCtrl.create({
				message: 'Please input your mobile number/verification code.',
				duration: 2500,
			}).present();
        }
        else if(user == "" || user == null)
        {
            this.toastCtrl.create({
				message: 'Please input username.',
				duration: 2500,
			}).present();
        }
        else    if (this.success == false)
        {
            this.toastCtrl.create({
				message: 'Username does not exist. Please try again.',
				duration: 2500,
			}).present();
        }
    }

    private refreshData(): void {
         
        this.postsSubscription = this.log.getCustomer().subscribe(

        data  => {
                    console.log(this.cus.length);
                    var i =0;
                    for (let cust of data)
                    {
                            //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                            //console.log(data);
                            this.cus[i]=({
                                'customerID': cust.customerID, 
								'cusPassword': cust.cusPassword, 
                                'number': cust.number, 
								'address': cust.address, 
								'cusLastName': cust.cusLastName,
								'cusMiddleName': cust.cusMiddleName, 
								'cusFirstName': cust.cusFirstName, 
								'verificationCode': cust.verificationCode,								
                            });
                            i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                            
                            //console.log(item);
                            //console.log(i);
                    }
                    if(i < this.cus.length)
                    {
                        let dif = this.cus.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.cus.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
		    this.subscribeToData();
            console.log(this.cus);
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log("complete");
        }
        );
        
    }
    private subscribeToData(): void {

        this.timerSubscription = Observable.timer(3000)
            .subscribe(() => this.refreshData());
    }
     public ngOnDestroy(): void {

            if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
            }
            if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            }
    }
        
    
}