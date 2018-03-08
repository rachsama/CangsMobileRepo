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
    barangay:any;// add
    barangay2: any;
    address2: any;
    number2: any;
    verificationCode:any;
    msg:any="";
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
    changeInfo(){ //add... delete all code relating to the verification code
        console.log(this.number);
        console.log(this.address);
        if(this.number != null && this.address != null && /*add*/ this.barangay != null && this.number != "" && this.address != "")
        {
            this.cus[0].number=this.number;
            this.cus[0].address=this.address;
            this.cus[0].barangay=this.barangay;// add this
            console.log(this.cus);
            this.log.editCustomer(this.cus[0]);
            setTimeout (() => {
                this.msg="You have successfully updated your information!"; //add sentence case na ni
                this.presentToast();
                this.verificationCode="";
            }, 1000)
                
        }
        //add new if 
        else if(this.address2 == this.address && this.number2 == this.number && this.barangay2 == this.barangay)
        {
            this.msg="Information is already up-to-date";
            this.presentToast();
            this.msg="";
        }
        // ends here
        else
        {
            this.msg="Please fill up form";
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
    
}