import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { OrderService } from '../../pages/order/order.service';
import { LoginService } from '../../pages/login/login.service';
import { ModalController } from 'ionic-angular';
import { ModalPage } from './modal-page';
import { CartPage } from '../../pages/cart/cart';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";

import { SharedService } from '../../app/app.service';
import { ToastController,MenuController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
     public history:any =[];
     public details:any=[];
     public customer:any=[];
     public newcart:any=[];
     public clicked:boolean =false;
     private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
      constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public ord:OrderService,
        public menu :MenuController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        private network: Network,
        public log:LoginService,
        public shared:SharedService) {
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
          console.log(this.shared.getUserName());
          this.ord.getHistory().subscribe(data =>{
              this.history=data;
              console.log(this.history);
          });
          this.refreshData();
      }
      getDetails(orderID,customerID,orderTotal,card, orderStatus)
      { 
          this.clicked=true;
          console.log(card);
          this.ord.getDetails(orderID).then(data =>{
              this.details=data;
          });
          this.ord.get1Customer(customerID).then(data =>{
              this.customer=data;
          });
         setTimeout (() => {
              console.log(this.customer);
              console.log(this.details);
              let modal = this.modalCtrl.create(ModalPage, {customer: this.customer, details:this.details, total:orderTotal, status:orderStatus, /* zane*/orderID:orderID});
              modal.present();
              console.log("test");
              this.clicked=false;
           }, 1000)
      }
      
       private refreshData(): void {
         
        this.postsSubscription = this.ord.getHistory().subscribe(

        data  => {
                    console.log(this.history.length);
                    var i =0;
                    for (let hist of data)
                    {
                            //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                            //console.log(data);
                            this.history[i]=({
                                'orderID': hist.orderID, 
								'orderDate': hist.orderDate, 
                                'orderTotal': hist.orderTotal, 
								'orderStatus': hist.orderStatus, 
								'orderRemarks': hist.orderRemarks,
								'location': hist.location, 
								'orderTime': hist.orderTime, 
								'packaging': hist.packaging,				
								'customerID': hist.customerID,
                                'cashTendered': hist.cashTendered 				
                            });
                            i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                            
                            //console.log(item);
                            //console.log(i);
                    }
                    if(i < this.history.length)
                    {
                        let dif = this.history.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.history.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
		    this.subscribeToData();
            console.log(this.history);
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
