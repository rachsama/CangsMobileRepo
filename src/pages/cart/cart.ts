import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';
import { LoginService } from '../../pages/login/login.service';
import { OrderPage } from '../../pages/order/order';
import { CategoryPage } from '../../pages/category/category';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
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
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  packaging: string='Plastic';
  public stored:any=[];
  public error:any=[];
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
      this.ord.getStored().subscribe(data =>{
            this.stored=data;
      });
      this.refreshData();
  }

  addOrder(delLocation, packaging, delTime, remarks, coh){
        for(var t=0;t<this.orderData.length;t++)
        {
               for(var a=0;a<this.stored.length;a++)
               {
                    console.log("inside 2ndloop");
                    if(this.stored[a].itemID == this.orderData[t].itemID)
                    {
                        console.log("inside 1sttrue");
                        if(this.stored[a].itemQuantityStored >= this.orderData[t].quantity)
                        { 
                              console.log(this.stored[a].itemQuantityStored);
                              console.log(this.orderData[t].quantity);
                              console.log("inside true");
                        }
                        else
                        {
                          console.log("inside false");
                              this.error.push({
                                    "itemName":this.orderData[t].itemName,
                                    "quantity":this.stored[a].itemQuantityStored,
                              });
                        }
                    }
               }      
        }
        if(this.error.length ==0)
        {
        
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
                "customerID": this.shared.getUserName(),
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
                    message: 'Your cash tendered is less than total amount',
                    duration: 1500,
                  }).present();
            }
            
      }
      else
      {
            for(var x=0;x<this.error.length;x++)
            {

                alert("The item " + this.error[x].itemName + " currently has " + this.error[x].quantity + " items left. \nPlease adjust order accordingly.");
            }
      }
      console.log(this.error);

  }
  change(itemID,subTotal,itemPrice,input){
    console.log(!isNaN(input._value));
      if(!Number.isNaN(Number(input._value)))
      {
          //console.log(input);
          console.log("INSIDE TRUE");
         // console.log(input._value);
         // console.log(this.orderData);
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
     }
     else
     {
            console.log(input._value);
            console.log("INSIDE FALSE");
            input._value=Number(1);
            console.log(input._value);
            console.log(this.orderData);
            this.totalcount=0;
            for(var j=0; j<this.orderData.length; j++) 
            {
                if(this.orderData[j].itemID == itemID)
                {
                    this.orderData[j].subTotal = itemPrice * input._value;
                    this.orderData[j].quantity=Number(1);
                }
                this.totalcount +=this.orderData[j].subTotal;
        //        console.log(this.totalcount);
        //       console.log(this.orderData);
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
  private refreshData(): void {
         
        this.postsSubscription = this.ord.getStored().subscribe(

        data  => {
                   // console.log(this.stop);
                          var i=0;     
                           for (let store of data)
                            {
                                    //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                                    //console.log(data);
                                    this.stored[i]=({
                                        'itemID': store.itemID, 
                                        'itemQuantityStored': store.itemQuantityStored, 
                                                     				
                                    });
                                    i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                                    
                                    //console.log(item);
                                    //console.log(i);
                            }
                          if(i < this.stored.length)
                          {
                              let dif = this.stored.length -i;
                              let test;
                              for(dif;dif>0;dif--)
                              {
                                      test=this.stored.pop();
                                  //   console.log(test);
                              }
                          }
                          i=0;   
                       
              this.subscribeToData();
              console.log(this.stored);
            
        },
        function (error) {
            console.log(error);
        },
        function () {
           // console.log("complete");
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
