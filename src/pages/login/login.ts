import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginService } from './login.service';
import { ListPage } from '../../pages/list/list';
import { OrderPage } from '../../pages/order/order';
import { CategoryPage } from '../../pages/category/category';
import { ForgotPassPage } from '../../pages/forgotpass/forgotpass';
import { SharedService } from '../../app/app.service';

import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	user: any;
	pass: any;
	//error:any;

	MoveToOrder(){
		//10016
		//ed9d07d5
		this.shared.setUserName(this.user);
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
	match:boolean=false;
	private timerSubscription: AnonymousSubscription;
	private postsSubscription: AnonymousSubscription;
  counter=0;
  constructor(private _md5: Md5, 
							private log: LoginService, 
							public navCtrl: NavController,
							public menu :MenuController,
							public toastCtrl: ToastController,
							public shared:SharedService){
				this.log.getCustomer().subscribe(res =>{
					this.cus=res;
				//	alert("DATA RETRIEVED LOGIN");
				}, function (error) {
				//	alert("DATA NOT RETRIEVED LOGIN");
				//	alert(error);
				},);
				
				this.refreshData();
				this.menu.enable(false,"myMenu");
	}

  login(event : any)
  {
		console.log(this.user);
		this.match=false;
		//console.log(Md5.hashStr(this.pass));
		if(this.pass != "" && this.pass != null && this.user != "" && this.user != null)
		{
			if(this.cus.length !=0)
			{
				for(let data of this.cus)
				{
					
					if(this.user == data.customerID)
					{	
						this.error="Incorrect Password";
						console.log("matchuser");
						this.match=true;
						if(Md5.hashStr(this.pass) == data.cusPassword)
						{
							
							console.log(data);
							this.inputuser=data.customerID;
							this.inputpass=data.cusPassword;
							this.log.getCustomerID(data.customerID);
							this.inputusername= data.cusFirstName + " " + data.cusMiddleName + ". " + data.cusLastName;
							this.logindetails=true;
							this.error=""
							console.log("matchpass");
							this.error="";
							this.MoveToOrder();
							/*
							this.toastCtrl.create({
								message: 'Welcome ' + this.inputusername,
								duration: 2500,
							}).present();*/
							console.log("yeye");
						}
						else
						{

						}
						//if(this.error=="Incorrect Password")
						//this.presentToast();
					}
					else
					{
						if(!this.match)
						this.error="Invalid Username";		
					}
					
					console.log(data.cusPassword);
				}
				this.presentToast();
			}
			else
			alert("You are not connected to the Internet!")
		}
		else
		{
			console.log("true");
			if(this.pass == "" && this.pass == null && this.user == "" && this.user == null)
			{
				if(this.user == null || this.user == "")
				{
					this.error="Please Enter Username";
					this.presentToast();
				}
				if(this.pass == null || this.pass == "")
				{
					this.error="Please Enter Password";
					this.presentToast();
				}
			}
			else
			{
				this.error="Please Fill Up Login Details";
				this.presentToast();

			}
			
		}
	}
	presentToast() {
        console.log("test2");
        let toast = this.toastCtrl.create({
        message: this.error,
        duration: 1500
        });
        toast.present();
    }
	fPass(){
		this.navCtrl.push(ForgotPassPage);
	}
	
	
	 private refreshData(): void {
         
        this.postsSubscription = this.log.getCustomer().subscribe(

        data  => {
                   // console.log(this.cus.length);
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
			//alert(error);
			console.log(error);
			//console.log(this.counter);
			//this.counter++;
           // this.notconnected(this.counter);
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
