import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { OrderService } from '../../pages/order/order.service';
import { LoginService } from '../../pages/login/login.service';
import { ModalController } from 'ionic-angular';
import { ModalPage } from './modal-page';
import { CartPage } from '../../pages/cart/cart';

import { SharedService } from '../../app/app.service';
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
      constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public ord:OrderService,
        public modalCtrl: ModalController,
        public log:LoginService,
        public shared:SharedService) {
          console.log(this.navParams.get('data1'));
          console.log(this.navParams.get('data2'));
          console.log(this.shared.getUserName());
          this.ord.getHistory().subscribe(data =>{
              this.history=data;
              console.log(this.history);
          });
      }
      getDetails(orderID,customerID,orderTotal,card)
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
              let modal = this.modalCtrl.create(ModalPage, {customer: this.customer, details:this.details, total:orderTotal});
              modal.present();
              console.log("test");
              this.clicked=false;
           }, 1000)
      }
      

  
}
