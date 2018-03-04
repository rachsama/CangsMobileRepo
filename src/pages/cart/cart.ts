import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';
import { LoginService } from '../../pages/login/login.service';
import { OrderPage } from '../../pages/order/order';
import { CategoryPage } from '../../pages/category/category';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';

import { SharedService } from '../../app/app.service';
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public item: any=[];
  public orderData: any=[];
  public sendOrder: any=[];
  public cartData: any=[];
  public cartData2: any=[];
  packaging: string='Plastic';
  
  ngOnInit () {
    this.packaging = 'Plastic';
  }
  currentval:number = 1;
  total: number=0;
  coh: number;
  totalcount:number=0;
  fee:number=20;
  withfee:boolean=false;
  with:string ="";

  year: any;
  day: any;
  month: any;
  hour: any;
  minutes: any;
  date: any;

  intyear: number;
  intday: number;
  intmonth: number;
  inthour: number;
  intminutes: number;
  intdate: number;

  trapyear: any;
  trapday: any;
  trapmonth: any;
  traphour: any;
  trapminutes: any;
  trapdate: any;

  delDate: String = new Date(new Date().getTime()+(31500000)).toISOString();
  timetrap: String = new Date(new Date().getTime()+(31500000)).toISOString();
  orderTime: String = new Date(new Date().getTime()+(28800000)).toISOString();
  orderGo: boolean=true;
  constructor( public navCtrl: NavController, 
               public navParams: NavParams, 
               public ord: OrderService, 
               public toastCtrl: ToastController,
               private network: Network,
               public menu:MenuController,
               public viewCtrl:ViewController,
               private shared: SharedService,
               public log:LoginService) {
                 
          this.trapyear = this.timetrap.substring(0,4);
          console.log(this.trapyear);

          this.trapday = this.timetrap.substring(5,7);
          console.log(this.trapday);

          this.trapmonth = this.timetrap.substring(8,10);
          console.log(this.trapmonth);

          this.traphour = this.timetrap.substring(11,13);
          console.log(this.traphour);

          this.trapminutes = this.timetrap.substring(14,16);
          console.log(this.trapminutes);


          //trap to int
          this.trapyear = parseInt(this.trapyear);
          console.log(this.trapyear)

          this.trapday = parseInt(this.trapday);
          console.log(this.trapday)
    
          this.trapmonth = parseInt(this.trapmonth);
          console.log(this.trapmonth)

          this.traphour = parseInt(this.traphour);
          console.log(this.traphour)

          this.trapminutes = parseInt(this.trapminutes);
          console.log(this.trapminutes)
          //
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
                 
      for(var i=0; i<this.shared.getCart().length; i++){
        this.orderData[i] = this.shared.getCart()[i];
        this.totalcount +=this.shared.getCart()[i].subTotal;
        console.log(this.totalcount);
      }
      if(this.totalcount < 500)
      {
          this.totalcount +=20;
          this.withfee=true;
          this.with=" with Fee";
      }
      console.log(this.orderData);
      console.log(this.shared.getCart()); 
      if(this.shared.getCart().length==0)
      this.navCtrl.pop();
      console.log("CONSTRUCT CART");

  }

  addOrder(delLocation, packaging, delDate, remarks, coh){
    console.log(delDate);
    console.log(this.orderTime);
    this.year = delDate.substring(0,4);
    console.log(this.year);

    this.day = delDate.substring(5,7);
    console.log(this.day);

    this.month = delDate.substring(8,10);
    console.log(this.month);

    this.hour = delDate.substring(11,13);
    console.log(this.hour);

    this.minutes = delDate.substring(14,16);
    console.log(this.minutes);

    
//to int
    this.intyear = parseInt(this.year);
    console.log(this.intyear)

    this.intday = parseInt(this.day);
    console.log(this.intday)
    
    this.intmonth = parseInt(this.month);
    console.log(this.intmonth)

    this.inthour = parseInt(this.hour);
    console.log(this.inthour)

    this.intminutes = parseInt(this.minutes);
    console.log(this.intminutes)
//

    console.log(this.totalcount);

    if(this.intmonth==this.trapmonth && this.intday<this.trapday){
      this.toastCtrl.create({
        message: 'Please set proper dates.2',
        position: 'middle',
        duration: 1500,
      }).present();
    }
    else if(this.intmonth<this.trapmonth){
      this.toastCtrl.create({
        message: 'Please set proper dates.1',
        position: 'middle',
        duration: 1500,
      }).present();
    }
    else if((coh > 1 && coh > this.totalcount))
      {
        if((this.inthour==18 && this.minutes>30) && (this.inthour<=23 && this.minutes<=59)){
          this.toastCtrl.create({
            message: 'Your order will be delivered tomorrow around 10 in the morning.',
            duration: 1500,
          }).present();

          this.hour='10';
          this.minutes='00';
        }

        if((this.inthour>=0 && this.inthour<10)){
          this.toastCtrl.create({
            message: 'Your order will be delivered today around 10 in the morning.',
            duration: 1500,
          }).present();

          this.hour='10';
          this.minutes='00';
        }
        for(var i=0; i<this.orderData.length; i++){
          console.log(this.orderData[i].quantity)
          this.total += this.orderData[i].itemPrice * this.orderData[i].quantity; 
        }    console.log(this.total);
        
        this.date = this.month + "/" + this.day + "/" + this.year + "  " + this.hour + ":" + this.minutes;
        console.log(this.date);
        this.sendOrder.push({
          "orderDate": this.orderTime,
          "orderTotal": this.total,
          "orderStatus": 'pending',
          "orderRemarks": remarks,
          "location": delLocation,
          "orderTime": this.date,
          "packaging": packaging,
          "customerID": this.shared.getUserName()/*LoginService.customerID*/,
          "cashTendered": coh,
        });
        console.log(this.sendOrder);
        this.viewCtrl.showBackButton(false);
        this.ord.makeOrder(this.sendOrder[0],this.orderData);
        
        setTimeout (() => {
          this.viewCtrl.showBackButton(true);
          this.menu.enable(true,"myMenu");
          this.navCtrl.setRoot(CategoryPage);
          }, 3000)	
      }
      else{
           this.toastCtrl.create({
              message: 'Your Cash Tendered is Less than Total Amount',
              duration: 1500,
            }).present();
      }
  }
  change(itemID,subTotal,itemPrice,input){
    
      //console.log(input);
      console.log(input._value);
      console.log(this.orderData);
      for(var i=0; i<this.orderData.length; i++){
          if(this.orderData[i].itemID == itemID)
          {
                  this.orderData[i].subTotal = itemPrice * input._value;
                  this.totalcount=0;
              //   console.log(this.orderData);
                  for(var j=0; j<this.orderData.length; j++) 
                  {
                    
                      this.totalcount +=this.orderData[j].subTotal;
                //     console.log(this.totalcount);
                  }                      
                  if(this.totalcount < 520)
                    {
                        if(this.withfee==true)
                        this.totalcount +=20;
                        
                        if(this.withfee==false)
                        {
                            this.withfee=true;
                            this.with=" with Fee";
                            this.totalcount +=20;
                        }
                //        console.log(this.totalcount);
                        
                    }
                    if(this.totalcount >= 520 && this.withfee)
                    {
                //      console.log("infalse")
                        this.withfee=false;
                        this.with="";
                        this.totalcount -=20;
                    }
          }
          if(input._value == "" || input._value==0 || input._value > 999)
          {
            console.log(input._value);
            console.log("inord");
            input._value=1;
            this.orderData[i].subTotal = itemPrice * input._value;
            this.totalcount=0;
              for(var j=0; j<this.orderData.length; j++) 
              {
                  this.totalcount +=this.orderData[j].subTotal;
          //        console.log(this.totalcount);
          //       console.log(this.orderData);
              }  
          }
        
     }
      //console.log(input._value);
      
  }
  
  addQty(itemID,subTotal,itemPrice,input,quantity){
     console.log(input._value);
       for(var i=0;i<this.orderData.length;i++)
      {
          if(this.orderData[i].itemID == itemID)
          {
              if(this.orderData[i].quantity ==1)
              {
                  console.log("in1");
                  this.orderData[i].quantity = 2;
              }
              
              else
              {
                  if(this.orderData[i].quantity > 999)
                  {
                    this.orderData[i].quantity =Number(1);
                  }
                  else
                  this.orderData[i].quantity =Number(this.orderData[i].quantity)+ Number(1);
              }
      }
      console.log(this.orderData);
      setTimeout (() => {
      this.change(itemID,subTotal,itemPrice,input);
      //console.log(this.orderData);
      }, 200)	
    }
  }
  removeQty(itemID,subTotal,itemPrice,input,quantity){
      for(var i=0;i<this.orderData.length;i++)
      {
          if(this.orderData[i].itemID == itemID)
          { 
              if(this.orderData[i].quantity==1)
              this.orderData[i].quantity = 1;
              else
              this.orderData[i].quantity -= 1;
          }
      }
      setTimeout (() => {
      this.change(itemID,subTotal,itemPrice,input);
      //console.log(this.orderData);
      }, 200)	
  }
  ionViewWillEnter(){
      if(this.shared.getCart().length==0)
      this.navCtrl.pop();
  }
  remove(itemID, itemName, itemDescription, itemPrice, itemQuantityStored, picture, visible)
  {
        
        for(var j=0; j<this.orderData.length; j++) 
        {
         //    console.log(itemID);
          //   console.log(this.orderData);
             if(itemID == this.orderData[j].itemID){
               
               this.totalcount -= this.orderData[j].subTotal; 
               if(this.totalcount <500)
               {
                   this.withfee=true; 
                   this.totalcount +=20;
               }
                      
                this.orderData.splice(j, 1);
              }
        }
        for(var i=0; i<this.shared.getCart().length; i++){
          this.cartData2[i] = this.shared.getCart()[i];
        }
       // console.log(this.cartData2)

        for (var i=0; i<this.cartData2.length; i++){
          if(itemID == this.cartData2[i].itemID){
            this.cartData2.splice(i, 1);
          }
        }
       // console.log(this.cartData2)
        //console.log(itemID);
        for(var i=0; i<this.item.length; i++){
          if(itemID == this.item[i].itemID){
            this.item[i].visible = false;
            //console.log(this.item[i].itemID);
          } 
        }

        this.shared.cleanCart();
        for (var i=0; i<this.cartData2.length; i++){
          this.cartData.push({
            itemID: this.cartData2[i].itemID,
            itemName: this.cartData2[i].itemName,
            itemDescription: this.cartData2[i].itemDescription,
            itemPrice: this.cartData2[i].itemPrice,
            itemQuantityStored: this.cartData2[i].itemQuantityStored,
            picture: this.cartData2[i].picture,
            subTotal: this.cartData2[i].itemPrice,
            visible: true
        }); 
          this.shared.setCart(this.cartData);
          this.cartData.pop();
        }

        if(this.shared.getCart().length==0)
        {
           this.navCtrl.pop();
        }
      
  }
}
