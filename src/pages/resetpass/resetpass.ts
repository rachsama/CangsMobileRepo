import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from '../../pages/login/login.service';
import { CartPage } from '../../pages/cart/cart';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";

import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';
import { SharedService } from '../../app/app.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html'
})
export class ResetPage {
  public oldpass: any;
  public newpass: any; 
  public newpass2: any;
  public verificationCode: any;
  public cus:any=[];
  public onecus:any=[];
  public data:any=[];
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  
  error:any;
  constructor(  private log: LoginService ,
                public toastCtrl: ToastController,
                public navCtrl: NavController,
                private network: Network,
                public loadingCtrl: LoadingController,
                private shared: SharedService,
                public navParams: NavParams) {
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
            this.log.get1Customer(this.shared.getUserName()).subscribe(res =>{
					this.cus=res;
		    });
            //this.refreshData();
  }

  reset(){
      if(this.newpass != null && this.newpass2 != null && this.oldpass !=null )
      {
        if(this.newpass != "" && this.newpass2 != "" && this.oldpass !="")
        {

            console.log(Md5.hashStr(this.oldpass));
            console.log("test");
            console.log(this.oldpass);
            console.log(this.newpass);
            console.log(this.newpass2);
           //b3ae83c0 f5445d66-7209
            if(this.cus.length !=0)
			{
                for(let data of this.cus)
                    {
                        if(this.shared.getUserName() == data.customerID)//change to nav params
                        {	
                                console.log(data.cusPassword);
                                console.log(Md5.hashStr(this.oldpass));
                                if(Md5.hashStr(this.oldpass) == data.cusPassword)
                                {
                                    
                                    if(this.newpass == this.newpass2 && this.newpass != null && this.newpass2 != null)
                                    {
                                        if(this.newpass.length >7 || this.newpass2.length >7)
                                        {

                                                
                                                        console.log("foundpass");
                                                        this.log.get1Customer(this.shared.getUserName()).subscribe(result => {
                                                            this.onecus=result;
                                                            console.log(this.onecus); 
                                                        });

                                                        let loading = this.loadingCtrl.create({
                                                            spinner: 'circles',
                                                            content: 'Please wait...',
                                                            cssClass: "loader"
                                                        });

                                                        loading.present();
                                                        setTimeout (() => {
                                                                this.data.push({
                                                                'customerID': data.customerID, 
                                                                'cusPassword': Md5.hashStr(this.newpass), 
                                                                'number': data.number, 
                                                                'address': data.address,
                                                                'cusLastName': data.cusLastName, 
                                                                'cusMiddleName': data.cusMiddleName, 
                                                                'cusFirstName': data.cusFirstName,				
                                                                'verificationCode': data.verificationCode 			
                                                                });
                                                                this.log.editCustomer(this.data[0]);
                                                                this.oldpass='';
                                                                this.newpass='';
                                                                this.newpass2='';
                                                                this.verificationCode='';
                                                                this.error="Password successfully changed";
                                                                this.presentToast();
                                                                loading.dismiss();
                                                        }, 1000)
                                                
                                               
                                        }
                                        else
                                        {
                                            this.error="Password must be atleast 8 characters";
                                            this.presentToast();
                                        }
                                            
                                    }
                                    else
                                    {
                                        if(this.newpass == null)
                                        {
                                            console.log("test2")
                                            this.error="Please enter new password";
                                            this.presentToast();
                                        }
                                        else if(this.newpass2 == null)
                                        {
                                            console.log("test2")
                                            this.error="Please re-enter new password";
                                            this.presentToast();
                                        }
                                        else
                                        {
                                            console.log("test2")
                                            this.error="New password does not match";
                                            this.presentToast();
                                        }
                                        
                                    }
                                                
                                }
                                else
                                {
                                    console.log("notfoundpass")
                                    this.error="Incorrect old password"; 
                                    this.presentToast();
                                } 
                        }
                    }
                }
                else
                {
                        this.error="Please fill up the form"; 
                        this.presentToast();
                }
        }
        else
        alert("You are not connected to the Internet!")
      }
      else
      {
            this.error="Please fill up the form"; 
            this.presentToast();
      }
    }
    presentToast() {
        console.log("test2");
        let toast = this.toastCtrl.create({
        message: this.error,
        duration: 3000
        });
        toast.present();
    }
    
     private refreshData(): void {
         
        this.postsSubscription = this.log.get1Customer(this.shared.getUserName()).subscribe(

        data  => {
                    console.log(this.cus.length);
                    var i =0;
                    for (let customer of data)
                    {
                            //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                            //console.log(data);
                            this.cus[i]=({
                                'customerID': customer.customerID, 
								'cusPassword': customer.cusPassword, 
								'number': customer.number, 
								'address': customer.address,
								'cusLastName': customer.cusLastName, 
								'cusMiddleName': customer.cusMiddleName, 
								'cusFirstName': customer.cusFirstName,				
								'verificationCode': customer.verificationCode 				
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