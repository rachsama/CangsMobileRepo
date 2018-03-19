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
  color='black';
  color2='black';
  ngOnInit () {
    this.packaging = 'Plastic';
    this.delDate = new Date(this.orderTime + 31500000).toISOString();
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
  cus:any=[];
  address:any;
  address2: string;
  delDate: String; //= new Date(new Date().getTime()+(31500000)).toISOString();
  timetrap: String; //= new Date(new Date().getTime()+(31500000)).toISOString();
  orderTime: any;// = new Date(new Date().getTime()+(28800000)).toISOString();
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

          this.log.get1Customer(this.shared.getUserName()).subscribe(res =>{
					        this.cus=res;
                  console.log(this.cus);
                  this.address= this.cus[0].address + ", " + this.cus[0].barangay;               
                  this.address2 = this.address;
                  console.log(this.address);
				        }, function (error) {
					      alert(error);
				        },);
                
                console.log(this.navParams.get('time'));
                console.log("HERE");
                this.orderTime = this.navParams.get('time').substring(6,19);
                console.log("HERE");
                this.orderTime = parseInt(this.orderTime);
                this.delDate = new Date(this.orderTime + 31500000).toISOString();
                console.log(this.orderTime);
                console.log(this.delDate + "delDate");
                this.timetrap = new Date(this.orderTime + 31500000).toISOString();
                console.log(this.timetrap);
           this.trapyear = this.timetrap.substring(0,4);
          console.log(this.trapyear);

          this.trapday = this.timetrap.substring(8,10);
          console.log(this.trapday);

          this.trapmonth = this.timetrap.substring(5,7);
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

  addOrder(address, packaging, delDate, remarks, coh){
        console.log(delDate);
        console.log(this.orderTime);
        this.year = delDate.substring(0,4);
        console.log(this.year);

        this.day = delDate.substring(8,10);
        console.log(this.day + "day");

        this.month = delDate.substring(5,7);
        console.log(this.month + "month");

        this.hour = delDate.substring(11,13);
        console.log(this.hour);

        this.minutes = delDate.substring(14,16);
        console.log(this.minutes);

        
    //to int
        this.intyear = parseInt(this.year);
        console.log(this.intyear)

        this.intday = parseInt(this.day);
        console.log(this.intday + "day")
        
        this.intmonth = parseInt(this.month);
        console.log(this.intmonth + "month")

        this.inthour = parseInt(this.hour);
        console.log(this.inthour)

        this.intminutes = parseInt(this.minutes);
        console.log(this.intminutes)
    //
        console.log(this.totalcount);

        for(var t=0;t<this.orderData.length;t++)
        {
               for(var a=0;a<this.stored.length;a++)
               {
                   
                    if(this.stored[a].itemID == this.orderData[t].itemID)
                    {
                        
                        if(this.stored[a].itemQuantityStored >= this.orderData[t].quantity)
                        { 
                              console.log(this.stored[a].itemQuantityStored);
                              console.log(this.orderData[t].quantity);
                              
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
          /*
              var mon=this.trapmonth;
              var mon2=this.intmonth;
              var day=this.trapday;
              var day2=this.intday;*/
              var err=false;          
              if(((this.intmonth-this.trapmonth)==1))
              { 
                  
                  if(this.trapmonth<8 && this.trapmonth%2==0)
                  {
                     if(this.trapmonth%2==0)
                     { 
                          if(this.trapmonth==2 && ((this.trapyear % 4 == 0) && (this.trapyear % 100 != 0)) || (this.trapyear % 400 == 0))
                          {
                              if(this.trapday==29 && ((this.intday-this.trapday)!= -26))
                              {
                                  err=true;
                              }
                              else if(this.trapday==28 && ((this.intday-this.trapday)!= -26))
                              {
                                  err=true;
                              }
                              else if(this.trapday==27 && ((this.intday-this.trapday)!= -26))
                              {
                                  err=true;
                              }
                              else
                              {
                                  if(this.trapday==29 || this.trapday==28 || this.trapday==27)
                                  {

                                  }
                                  else
                                  {
                                      err=true;
                                  }
                              }
                          }
                          else 
                          {
                              if(this.trapmonth==2)
                              {
                                      if(this.trapday==28 && ((this.intday-this.trapday)!= -25))
                                      {
                                          err=true;
                                      }
                                      else if(this.trapday==27 && ((this.intday-this.trapday)!= -25))
                                      {
                                          err=true;
                                      }
                                      else if(this.trapday==26 && ((this.intday-this.trapday)!= -25))
                                      {
                                          err=true;
                                      }
                                      else
                                      {
                                          if(this.trapday==28 || this.trapday==27 || this.trapday==26)
                                          {

                                          }
                                          else
                                          {
                                              err=true;
                                          }
                                      }
                              }
                              else
                              {  
                                      if(this.trapday==30 && ((this.intday-this.trapday)!= -27))
                                      {
                                          err=true;
                                      }
                                      else if(this.trapday==29 && ((this.intday-this.trapday)!= -27))
                                      {
                                          err=true;
                                      }
                                      else if(this.trapday==28 && ((this.intday-this.trapday)!= -27))
                                      {
                                          err=true;
                                      }
                                      else
                                      {
                                          if(this.trapday==30 || this.trapday==29 || this.trapday==28)
                                          {

                                          }
                                          else
                                          {
                                              err=true;
                                          }
                                      }
                              }  
                          }
                     }
                     else
                     {
                            if(this.trapday==31 && ((this.intday-this.trapday)!= -28))
                            {
                                err=true;
                            }
                            else if(this.trapday==30 && ((this.intday-this.trapday)!= -28))
                            {
                                err=true;
                            }
                            else if(this.trapday==29 && ((this.intday-this.trapday)!= -28))
                            {
                                err=true;
                            }
                            else
                            {
                                if(this.trapday==31 || this.trapday==30 || this.trapday==29)
                                {

                                }
                                else
                                {
                                     err=true;
                                }
                            }
                     }
                  }
                  else
                  {
                        if(this.month%2==0)
                        {
                            if(this.trapday==31 && ((this.intday-this.trapday)!= -28))
                            {
                                err=true;
                            }
                            else if(this.trapday==30 && ((this.intday-this.trapday)!= -28))
                            {
                                err=true;
                            }
                            else if(this.trapday==29 && ((this.intday-this.trapday)!= -28))
                            {
                                err=true;
                            }
                            else
                            {
                                if(this.trapday==31 || this.trapday==30 || this.trapday==29)
                                {

                                }
                                else
                                {
                                     err=true;
                                }
                            }
                        }
                        else
                        {
                              if(this.trapday==30 && ((this.intday-this.trapday)!= -27))
                              {
                                  err=true;
                              }
                              else if(this.trapday==29 && ((this.intday-this.trapday)!= -27))
                              {
                                  err=true;
                              }
                              else if(this.trapday==28 && ((this.intday-this.trapday)!= -27))
                              {
                                  err=true;
                              }
                              else
                              {
                                  if(this.trapday==30 || this.trapday==29 || this.trapday==28)
                                  {

                                  }
                                  else
                                  {
                                      err=true;
                                  }
                              }
                              
                        }
                  }
              }
              else
              {
                  if(((this.intmonth-this.trapmonth)==0))
                  {
                      
                  }
                  else
                  {
                      err=true;
                  }

              }
              if((this.intmonth<this.trapmonth) || (this.intmonth==this.trapmonth && this.intday<this.trapday)){
              this.toastCtrl.create({
                message: 'Please set proper a date',
                position: 'middle',
                duration: 3000,
              }).present();
              this.color='red';
            }
            else if((this.intmonth==this.trapmonth && ((this.intday-this.trapday)>3)) ||  err )
            {
                   this.toastCtrl.create({
                    message: 'Please set proper a date',
                    position: 'middle',
                    duration: 3000,
                  }).present();
                  this.color='red';
            }
             else if(((this.inthour<this.traphour) || (this.inthour==this.traphour && this.intminutes<this.trapminutes)) && (this.trapday == this.intday) ){
              this.toastCtrl.create({
                message: 'Please set proper a time',
                position: 'middle',
                duration: 3000,
              }).present();
              this.color2='red';
            }
            
            else if(this.inthour<10 || (this.inthour==10 && this.intminutes<45) || (this.inthour==18 && this.intminutes>30) || this.inthour>18 )
            {
              this.toastCtrl.create({
                message: 'Allowed time of delivery are between 10:45 am to 6:30 pm',
                position: 'middle',
                duration: 3000,
              }).present();
              this.color2='red';
            }
            else if(coh > 1 && coh >= this.totalcount)
            {
                this.color='black';
                this.color2='black';
                if((this.inthour>18 || (this.inthour == 18 && this.intminutes>30)) && (this.inthour<23 || (this.inthour==23 && this.intminutes<=59)))//night
                {
                  /*
                  this.toastCtrl.create({
                    message: 'Your order will be delivered tomorrow around 10:45 in the morning',
                    duration: 3000,
                  }).present();
                  */
                  
                  this.hour='10';
                  this.minutes='45';

                  if(((this.intmonth == 1) || (this.intmonth == 3) || (this.intmonth == 5) || (this.intmonth == 7) ||
                  (this.intmonth == 8) || (this.intmonth == 10) || (this.intmonth == 12)) && (this.intday == 31)) 
                  {
                    this.day='01';

                    if(this.intmonth == 12){
                      this.month='01'
                      this.intyear++;
                      this.year= this.intyear.toString();
                    }
                    else{
                      this.intmonth++;
                      this.month=this.intmonth.toString();
                    }
                  }
                  else if(((this.intmonth == 4) || (this.intmonth == 6) || (this.intmonth == 9) || (this.intmonth == 11))  && (this.intday == 30))
                  {
                    this.day='01';
                    this.intmonth++;
                    this.month=this.intmonth.toString();
                  }
                  else if(this.intmonth == 2)
                  {
                    if(( (this.intyear%4) == 0) && (this.intday == 29))
                    {
                      this.day='01';
                      this.intmonth++;
                      this.month=this.intmonth.toString();
                    }
                    else
                    {
                      this.day='01';
                      this.intmonth++;
                      this.month=this.intmonth.toString();
                    }
                  }
                  else 
                  {
                    this.intday++;
                    this.day= this.intday.toString(); 
                  }
                  console.log("should alert");
                //   alert("MAO NI NI SULOD3");
                  alert("Your order will be delivered on " + this.month + "/" + this.day + "/" + this.year + " around 10:45 in the morning");
                }
                else if(this.inthour>=0 && this.inthour<10 || (this.inthour==10 && this.intminutes<45))//day
                {
                  console.log("should alert2");
              //     alert("MAO NI NI SULOD2");
                  alert("Your order will be delivered on " + this.month + "/" + this.day + "/" + this.year + " around 10:45 in the morning.");
                /*  this.toastCtrl.create({
                    message: 'Your order will be delivered today around 10:45 in the morning',
                    duration: 3000,
                  }).present();*/

                  this.hour='10';
                  this.minutes='45';
                }
                else
                {
              //    alert("MAO NI NI SULOD");
                  this.hour = parseInt(this.hour);
                  if(this.hour >= 12)
                  {
                    this.hour = parseInt(this.hour);
                    this.hour = this.hour - 12;
                    this.hour = this.hour.toString();
                    console.log(this.hour+ "MAO NI");
                    this.date = this.month + "/" + this.day + "/" + this.year + "  " + this.hour + ":" + this.minutes + "PM";
                  }
                  else 
                  {
                    this.date = this.month + "/" + this.day + "/" + this.year + "  " + this.hour + ":" + this.minutes + "AM";
                  }
                    alert("Your order will be delivered on " + this.date+ ".");
                }
                for(var i=0; i<this.orderData.length; i++){
                  console.log(this.orderData[i].quantity)
                  this.total += this.orderData[i].itemPrice * this.orderData[i].quantity; 
                }    console.log(this.total);
                if(address == "" || address == null){
                  address = this.address2;
                }
                let time = new Date();
                  console.log(time);
                  let mm =time.getMonth();
                  let dd =time.getDate();
                  let yy =time.getFullYear();
                  let hh =time.getHours();
                  let ss =time.getSeconds();
                  let min =time.getMinutes();
                 // let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + min + ":" + ss;
                /*this.hour = parseInt(this.hour);
                if(this.hour >= 12)
                {
                  this.hour = parseInt(this.hour);
                  this.hour = this.hour - 12;
                  this.hour = this.hour.toString();
                  console.log(this.hour+ "MAO NI");
                  this.date = this.month + "/" + this.day + "/" + this.year + "  " + this.hour + ":" + this.minutes + "PM";
                }
                else 
                {
                  this.date = this.month + "/" + this.day + "/" + this.year + "  " + this.hour + ":" + this.minutes + "AM";
                }*/
                console.log(this.orderTime);
                console.log(this.date);
                this.sendOrder.push({
                "orderDate": this.orderTime,
                "orderTotal": this.total,
                "orderStatus": 'pending',
                "orderRemarks": remarks,
                "location": address,
                "orderTime": this.date,
                "packaging": packaging,
                "customerID": this.shared.getUserName(),
                "cashTendered": coh,
              });
              console.log(this.sendOrder);
              this.viewCtrl.showBackButton(false);
              this.ord.makeOrder(this.sendOrder[0],this.orderData);
              err=false;
              this.color='black';
                this.color2='black';
              setTimeout (() => {
                this.viewCtrl.showBackButton(true);
                this.menu.enable(true,"myMenu");
                this.navCtrl.setRoot(CategoryPage);
                }, 3000)	
            }
            else{
              this.color='black';
                this.color2='black';
                this.toastCtrl.create({
                    message: 'Your cash tendered is less than total amount',
                    duration: 3000,
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
      this.error=[];
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
