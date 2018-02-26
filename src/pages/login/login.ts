import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { Network } from '@ionic-native/network';

import { LoginService } from './login.service';
import { SharedService } from '../../app/app.service';
import { ListPage } from '../../pages/list/list';
import { CategoryPage } from '../../pages/category/category';
import { ForgotPassPage } from '../../pages/forgotpass/forgotpass';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	success: boolean=false;
	user: any;
	pass: any;

	MoveToOrder(){
		//10016
		//ed9d07d5
		console.log("move page");
		this.navCtrl.setRoot(CategoryPage, {
			data1: this.user,
			data2: this.pass
		});
	}

	hash:string = '';
  	public cus: any=[];
  	public error: string ="";
  	logindetails: boolean=false;
  	public inputuser: string = '';
	public inputpass: string ='';
	public inputusername: string ='';
	public static customerID=0;
  	constructor(private shared: SharedService,private _md5: Md5, private log: LoginService, public navCtrl: NavController, private toastCtrl: ToastController, private network: Network ){
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
				});
//Network
	}

 	login(event : any)
  	{
		console.log(this.user);
		console.log(Md5.hashStr(this.pass));
		for(let data of this.cus)
		{
			
			if(this.user == data.customerID)
      		{	
				this.error="Incorrect Password";
				console.log("matchuser");
				if(Md5.hashStr(this.pass) == data.cusPassword)
				{
          			console.log(data);
					this.inputuser=data.customerID;
					this.inputpass=data.cusPassword;
					this.shared.setUserName(data.customerID);
					this.inputusername= data.cusFirstName + " " + data.cusMiddleName + ". " + data.cusLastName;
					this.logindetails=true;
					this.error=""
					this.success = true;
					this.MoveToOrder();
					this.toastCtrl.create({
						message: 'Welcome ' + this.inputusername,
						duration: 2500,
					}).present();
				}
			}
			console.log(data.cusPassword);
		}
		if (this.success == false){
			this.toastCtrl.create({
				message: 'There has been an Error with your Credentials. Please Try Again.',
				duration: 2500,
			}).present();
		}
	}

	fPass(){
		this.navCtrl.setRoot(ForgotPassPage);
	}

}
