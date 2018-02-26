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
  constructor( public navCtrl: NavController, 
               public navParams: NavParams, 
               public ord: OrderService, 
               public toastCtrl: ToastController,
               private network: Network,
               public menu:MenuController,
               public viewCtrl:ViewController,
               private shared: SharedService,
               public log:LoginService) {
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

  addOrder(delLocation, packaging, delTime, remarks, coh){
    console.log(this.totalcount);
      if(coh > 1 && coh > this.totalcount)
      {
          for(var i=0; i<this.orderData.length; i++){
            console.log(this.orderData[i].quantity)
            this.total += this.orderData[i].itemPrice * this.orderData[i].quantity; 
          }    console.log(this.total);
          
          let time = new Date();
            console.log(time);
            let mm =time.getMonth();
            let dd =time.getDate();
            let yy =time.getFullYear();
            let hh =time.getHours();
            let ss =time.getSeconds();
            let min =time.getMinutes();
            let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + min + ":" + ss;

          this.sendOrder.push({
          "orderDate": timestamp,
          "orderTotal": this.total,
          "orderStatus": 'pending',
          "orderRemarks": remarks,
          "location": delLocation,
          "orderTime": delTime,
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
