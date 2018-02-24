import { Component } from '@angular/core';
import { NavController, NavParams, Nav,MenuController } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';

import { CartPage } from '../../pages/cart/cart';
import { SharedService } from '../../app/app.service';
import { ToastController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  public item: any=[];
  public cartData: any=[];
  public cartData2: any=[];
  selected:any = [];
  public item2: any=[];
  vis:boolean=false;
  init:boolean=false;
  initial:boolean=false;
  load:boolean=false;
  leave:boolean=false;
  constructor( private log: OrderService ,
                public navCtrl: NavController, 
                public navParams: NavParams, 
                public toastCtrl: ToastController,
                private shared: SharedService,
                private network: Network,
                public menu: MenuController) {
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
    this.menu.enable(true,"myMenu");
    this.init=false;
    //console.log(this.navParams.get('category'));
    console.log("in2");
    this.load=false;
    this.leave=false;
    this.log.getCategoryItem(this.navParams.get('category')).then(res => {
		this.item2=res;
      
      for(var i=0; i<this.item2.length; i++){
          for(var j=0; j<this.shared.getCart().length; j++)
          {
              if(this.shared.getCart()[j].itemID == this.item2[i].itemID)
              {
                  this.item.push({
                        itemID: this.item2[i].itemID,
                        itemName: this.item2[i].itemName,
                        itemDescription: this.item2[i].itemDescription,
                        itemPrice: this.item2[i].itemPrice,
                        itemQuantityStored: this.item2[i].itemQuantityStored,
                        picture: "http://"+this.item2[i].picture,
                        subTotal: this.item2[i].subTotal,
                        visible: true,
                    });
                    this.vis=true;
                  // console.log("in loop");
              }
          }
          if(!this.vis)
          {
                //  console.log("in visible");
                  this.item.push({
                        itemID: this.item2[i].itemID,
                        itemName: this.item2[i].itemName,
                        itemDescription: this.item2[i].itemDescription,
                        itemPrice: this.item2[i].itemPrice,
                        itemQuantityStored: this.item2[i].itemQuantityStored,
                        picture: "http://"+this.item2[i].picture,
                        subTotal: this.item2[i].subTotal,
                        visible: false,
                    });
                    this.vis=false;
          }
          else
          this.vis=false;
      }

     // console.log(this.shared.getCart().length)
      

    });
   // console.log(this.item);
   // console.log(this.navParams.get('data1'));
   // console.log(this.navParams.get('data2'));
  }

  addCart(itemID, itemName, itemDescription, itemPrice, itemQuantityStored, picture, visible){
    //true
    if(visible == false){
      this.cartData.push({
        itemID: itemID,
        itemName: itemName,
        itemDescription: itemDescription,
        itemPrice: itemPrice,
        itemQuantityStored: itemQuantityStored,
        picture: picture,
        subTotal:itemPrice,
        visible: true
      });
    //  console.log(this.cartData); 
   //   console.log(itemID);
      for(var i=0; i<this.item.length; i++){
        if(itemID == this.item[i].itemID){
          this.item[i].visible = true;
        //  console.log(this.item[i].itemID);
        } 
      }
   //   console.log(this.cartData);
      this.shared.setCart(this.cartData);
      this.cartData.pop(); 
        let toast = this.toastCtrl.create({
        message: 'Added ' + itemName,
        duration: 1200,//kini siya
        position: 'top'
      });

      toast.present();

    } 
    
    
    //false
    if(visible == true){
      for(var i=0; i<this.shared.getCart().length; i++){
        this.cartData2[i] = this.shared.getCart()[i];
      }
 //     console.log(this.cartData2)

      for (var i=0; i<this.cartData2.length; i++){
        if(itemID == this.cartData2[i].itemID){
          this.cartData2.splice(i, 1);
        }
      }
  //    console.log(this.cartData2)
  //    console.log(itemID);
      for(var i=0; i<this.item.length; i++){
        if(itemID == this.item[i].itemID){
          this.item[i].visible = false;
       //   console.log(this.item[i].itemID);
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
          visible: true
      }); 
        this.shared.setCart(this.cartData);
        this.cartData.pop();
      }
       let toast = this.toastCtrl.create({
            message: 'Removed ' + itemName,
            duration: 1200,//kini siya
            position: 'top',
          });

          toast.present();
    }

    
  }

  gotoCart(){
      if(this.shared.getCart().length != 0){
        console.log("to cart");
        this.navCtrl.push(CartPage);
      }
      else if(this.shared.getCart().length == 0){
          let toast = this.toastCtrl.create({
            message: 'Please Fill Your Cart',
            duration: 2000,//kini siya
            position: 'middle'
        });
        toast.present();
        console.log(this.shared.getCart().length);
	    }
  }
  ionViewWillEnter(){
       console.log("in");
       this.leave=false;
       if(this.initial)
       {
            console.log("inside");
            if(this.shared.getCart().length==0 && this.init)
            {
                  let toast = this.toastCtrl.create({
                    message: "Please Fill up your Cart",
                    duration: 3000,
                    position:"top",
                    });
                    toast.present();
            }
            this.init=true;
            this.item2=[];
            this.item=[];
            this.log.getCategoryItem(this.navParams.get('category')).then(res => {
                this.item2=res;
                for(var i=0; i<this.item2.length; i++){
                    for(var j=0; j<this.shared.getCart().length; j++)
                    {
                        if(this.shared.getCart()[j].itemID == this.item2[i].itemID)
                        {
                            this.item.push({
                                  itemID: this.item2[i].itemID,
                                  itemName: this.item2[i].itemName,
                                  itemDescription: this.item2[i].itemDescription,
                                  itemPrice: this.item2[i].itemPrice,
                                  itemQuantityStored: this.item2[i].itemQuantityStored,
                                  picture: "http://"+this.item2[i].picture,
                                  subTotal: this.item2[i].itemPrice,
                                  visible: true,
                              });
                              this.vis=true;
                          //  console.log("in loop");
                        }
                    }
                    if(!this.vis)
                    {
                        //    console.log("in visible");
                            this.item.push({
                                  itemID: this.item2[i].itemID,
                                  itemName: this.item2[i].itemName,
                                  itemDescription: this.item2[i].itemDescription,
                                  itemPrice: this.item2[i].itemPrice,
                                  itemQuantityStored: this.item2[i].itemQuantityStored,
                                  picture: "http://"+this.item2[i].picture,
                                  subTotal: this.item2[i].itemPrice,
                                  visible: false,
                              });
                              this.vis=false;
                    }
                    else
                    this.vis=false;
                }
            });
            console.log(this.shared.getCart());

       }
       this.initial=true;
  }
  ionViewDidLoad(){
        this.leave=false;
     console.log("testing");
  }
  ionViewWillLeave(){
      if(this.leave)
      this.initial=false;
      console.log("leaving");
      this.leave=true;
  }

}