import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from '../../pages/login/login.service';
import { CartPage } from '../../pages/cart/cart';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
import { SharedService } from '../../app/app.service';
import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-editinfo',
  templateUrl: 'editinfo.html'
})
export class EditInfoPage {
    number:any;
    address:any;
    verificationCode:any;
    msg:any="";
    barangay:any;// add
    barangay2: any;
    address2: any;
    number2: any;
    public cus:any=[];
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
    constructor(  private log: LoginService ,
                public toastCtrl: ToastController,
                public navCtrl: NavController,
                 private network: Network,
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
                    console.log(this.cus[0].number);
                    this.number=this.cus[0].number;
                    this.address=this.cus[0].address;
                    this.barangay=this.cus[0].barangay;// add this
                    this.barangay2 = this.barangay;//add for check for changes
                    this.number2 = this.number;//add for check for changes
                   this.address2 = this.address;//add for check for changes
		    });
            //this.refreshData();
    }
    changeInfo(){
        console.log(this.number);
        console.log(this.address);
        if(this.number != null && this.address != null && /*add*/ this.barangay != null && this.number != "" && this.address != "")
        {
           
                this.cus[0].number=this.number;
                this.cus[0].address=this.address;
                this.cus[0].barangay=this.barangay;
                console.log(this.cus);
                this.log.editCustomer(this.cus[0]);
                setTimeout (() => {
                    this.msg="You have successfully updated your information!";
                    this.presentToast();
                    this.verificationCode="";
                }, 1000)
            
        }
        else
        {
            this.msg="Please fill up the form";
            this.presentToast();
            this.msg="";
        }
        
    }
    presentToast() {
       // console.log("test2");
        let toast = this.toastCtrl.create({
        message: this.msg,
        duration: 3000
        });
        toast.present();
    }
    /*
     private refreshData(): void {
         
        this.postsSubscription = this.log.get1Customer(10016).subscribe(

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
    */
}