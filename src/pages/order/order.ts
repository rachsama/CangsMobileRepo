import { Component } from '@angular/core';
import { NavController, NavParams, Nav,MenuController } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';

import { CartPage } from '../../pages/cart/cart';
import { SharedService } from '../../app/app.service';
import { ToastController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  searchQuery: string = '';
  public item: any=[];
  public cartData: any=[];
  public cartData2: any=[];
  selected:any = [];
  public item2: any=[];
  vis:boolean=false;
  init:boolean=false;
  initial:boolean=false;
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  load:boolean=false;
  leave:boolean=false;
  stop:boolean=false;
  constructor( private log: OrderService ,
                public navCtrl: NavController, 
                public navParams: NavParams, 
                public toastCtrl: ToastController,
                private shared: SharedService,
                private network: Network,
                public menu: MenuController) {
                  console.log("CONSTRUCT ORDER");
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
    this.menu.enable(true,"myMenu");
    this.init=false;
    //console.log(this.navParams.get('category'));
    console.log("in2");
    this.load=false;
    this.leave=false;
    
    this.log.getCategoryItem(this.navParams.get('category')).subscribe(res => {
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
    console.log(this.item2.length);
    this.refreshData();
   // console.log(this.item);
   // console.log(this.navParams.get('data1'));
   // console.log(this.navParams.get('data2'));
  }
   getItems(ev: any) {
      // Reset items back to all of the items
      //this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;
      if (val && val.trim() != '') {
          this.stop=true;
          console.log(this.stop);
      }
      else
      {
          this.stop=false;
          this.refreshData();
          console.log(this.stop);
      }
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.item = this.item.filter((items) => {
          return (items.itemName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
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
            message: 'Please fill your cart',
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
                    message: "Please fill up your cart",
                    duration: 3000,
                    position:"top",
                    });
                    toast.present();
            }
            this.init=true;
            this.item2=[];
            this.item=[];
            this.log.getCategoryItem(this.navParams.get('category')).subscribe(res => {
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
      var gone=false;
      if(this.leave)
      this.initial=false;
      console.log("leaving");
      this.leave=true;
  }
  
   private refreshData(): void {
         
        this.postsSubscription = this.log.getCategoryItem(this.navParams.get('category')).subscribe(

        data  => {
                   // console.log(this.stop);
                    if(!this.stop)
                    {
                     //     console.log(this.item2.length);
                          var k =0;
                          this.item=[];
                          if(this.item2.length !=0)
                          {
                              for(var i=0; i<data.length; i++){
                                    if(this.shared.getCart() != 0)
                                    {
                                            for(var j=0; j<this.shared.getCart().length; j++)
                                            {
                                                  if(this.shared.getCart()[j].itemID == data[i].itemID)
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
                                                        k++;
                                                  }
                                            }
                                            if(!this.vis)
                                            {
                                                  //  console.log("in visible");
                                                    this.item.push({
                                                          itemID: data[i].itemID,
                                                          itemName: data[i].itemName,
                                                          itemDescription: data[i].itemDescription,
                                                          itemPrice: data[i].itemPrice,
                                                          itemQuantityStored: data[i].itemQuantityStored,
                                                          picture: "http://"+data[i].picture,
                                                          subTotal: data[i].subTotal,
                                                          visible: false,
                                                      });
                                                      this.vis=false;
                                                      k++;
                                            }
                                            else
                                            this.vis=false;
                                  }
                                  else
                                  {
                                       // console.log("Test");
                                        this.item.push({
                                            itemID: data[i].itemID,
                                            itemName: data[i].itemName,
                                            itemDescription: data[i].itemDescription,
                                            itemPrice: data[i].itemPrice,
                                            itemQuantityStored: data[i].itemQuantityStored,
                                            picture: "http://"+data[i].picture,
                                            subTotal:data[i].subTotal,
                                            visible: false,
                                        });
                                        k++;
                                  }    
                                  
                            }     
                          }
                          else
                          {
                                if(this.shared.getCart() == 0)
                                {
                                    
                                    this.item.push({
                                              itemID: data[k].itemID,
                                              itemName: data[k].itemName,
                                              itemDescription: data[k].itemDescription,
                                              itemPrice: data[k].itemPrice,
                                              itemQuantityStored: data[k].itemQuantityStored,
                                              picture: "http://"+data[k].picture,
                                              subTotal:data[k].subTotal,
                                              visible: false,
                                          });
                                          this.vis=false;
                                          k++;
                                        
                                }
                          }     
                                        
                          if(k < this.item.length)
                          {
                              let dif = this.item.length - k;
                              let test;
                              for(dif;dif>0;dif--)
                              {
                                      test=this.item.pop();
                                  //   console.log(test);
                              }
                          }
                          i=0;   
                          // console.log(this.items.data);                
                          // console.log("latestest");      
                  //this.items.data = data;
              this.subscribeToData();
               //   console.log(this.item);
            }
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