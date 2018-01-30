import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginService } from './login.service';
import { OrderPage } from '../../pages/order/order';
import { HomePage } from '../../pages/home/home';
import { HistoryPage } from '../../pages/history/history';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	user: any;
	pass: any;

	MoveToOrder(){
		//10016
		//ed9d07d5
		console.log("move page");
		this.navCtrl.setRoot(OrderPage, {
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

  constructor(private _md5: Md5, private log: LoginService, public navCtrl: NavController){
				this.log.getCustomer().then(res =>{
							this.cus=res;
				});
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
					
					this.inputusername= data.cusFirstName + " " + data.cusMiddleName + ". " + data.cusLastName;
					this.logindetails=true;
					this.error=""
					console.log("matchpass");
					
					this.MoveToOrder();
					console.log("yeye");
				}
			}
			console.log(data.cusPassword);
		}
	}

}
