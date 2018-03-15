import { Component } from '@angular/core';
import { ModalController, Platform , NavParams, ViewController,NavController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';
import { OrderService } from '../../pages/order/order.service';
import { SharedService } from '../../app/app.service';
import { ToastController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  public customer:any =[];
  public details:any=[];
  public total:any="test";
  public newcart:any=[];
  public history: any=[];
  public note: string="";
  public status: string;
  public orderID: string;
  public orderStatus: any=[];
  public location:any;
  time:any;
  delDate:any;
  address: string;
  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public ord:OrderService,
              public viewCtrl: ViewController,
               public toastCtrl: ToastController,
              private network: Network,
              public app:App,
              public shared:SharedService) {
                    //Network
          this.network.onConnect().subscribe(() => {
            this.toastCtrl.create({
              message: 'Device is online',
              duration: 2500,
            }).present();
          });
          this.ord.getDate().then(res =>{
        this.time=res;
        console.log(this.time);
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
      this.customer = this.navParams.get('customer');
      this.details = this.navParams.get('details');
      this.total = this.navParams.get('total');
      //console.log(this.total);
      //console.log(this.customer);
      //console.log(this.details);
      this.customer = this.navParams.get('customer');
      this.details = this.navParams.get('details');
      this.total = this.navParams.get('total');
      this.status = this.navParams.get('status')
      this.orderID = this.navParams.get('orderID');
      this.location= this.navParams.get('location');
       this.address = this.navParams.get('barangay') + ", " +this.navParams.get('address')
      console.log(this.navParams.get('location'));
      //console.log(this.total);
      //console.log(this.customer);
      //console.log(this.details);
      console.log(this.orderID);
      this.ord.getOrderStatus(this.orderID).subscribe(res =>{
        this.orderStatus=res;
        console.log(this.orderStatus);
      });

      this.ord.getHistory().subscribe(data =>{
        this.history=data;
        console.log(this.history);
      });
      this.ord.getDeliveryDate(this.orderID).then(res =>{
        this.delDate=res[0].orderTime;
       console.log(this.delDate);
      });
      setTimeout(() => {
        if(this.status == 'pending'){
          this.note= "Your order is currently being processed. Thank  you for your patronage";
        }
        else if(this.status == 'cancelled')
        {
          this.note = "Order status cancelled. Reason: "+ this.orderStatus[0].orstatRemarks;
        }// zane zane zane zane zane zane zane zane zane end
        else if(this.status == 'verified')
        {
          this.note = "Your order has been verified, it is now being delivered";
        }
        else if(this.status == 'delivered')
        {
          this.note = "Your order has been delivered";
        }
      }, 2000)
  }

    dismiss(data) {
            this.viewCtrl.dismiss(data);
    }
    order(){
            
            console.log(this.details);
            for(var i=0;i<this.details.length;i++)
            {
                console.log("to asdf");
               this.ord.get1Item(this.details[i].itemID).then(data =>{
                 console.log(data);
                    data[0].picture = "http://" + data[0].picture;
                    this.newcart.push({
                          itemID: data[0].itemID,
                          itemName: data[0].itemName,
                          itemDescription: data[0].itemDescription,
                          itemPrice: data[0].itemPrice,
                          itemQuantityStored: data[0].itemQuantityStored,
                          picture: data[0].picture,
                          subTotal:data[0].itemPrice,
                          visible: false,
                    });
                    this.shared.setCart(this.newcart);
                    this.newcart.pop();
               });
            }
            console.log(this.newcart);
            
            setTimeout (() => {
                this.viewCtrl.dismiss();
                this.app.getRootNav().push(CartPage,{
                   // cartData: this.newcart,
                    time: this.time,
                    user:this.shared.getUserName(),//this.navParams.get('data1')
                });
            }, 1000)
	  }
    
      ionViewWillEnter(){
       // if(this.shared.getCart().length==0)
        this.shared.cleanCart();
    }
}