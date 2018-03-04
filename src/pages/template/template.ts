import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';
import { CategoryPage }from '../../pages/category/category';
import { SharedService } from '../../app/app.service';
import { TempGetPage } from '../../pages/tempget/tempget';
import { LoginPage } from '../../pages/login/login';
import { TempEditPage } from '../../pages/tempedit/tempedit';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
@Component({
  selector: 'page-template',
  templateUrl: 'template.html'
})
export class TemplatePage {
    public item: any=[];
    public tempData: any=[];
    public tempData2: any=[];
    selected:any = [];
    public item2: any=[];
    vis:boolean=false;
    check: boolean = false;
    stop:boolean=false;
     private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
    constructor(private network: Network,private toastCtrl: ToastController, private log: OrderService ,public navCtrl: NavController, public navParams: NavParams, private shared: SharedService) {
     console.log(this.navParams.get('check'));
    console.log(this.navParams.get('templateID'));
    if(this.navParams.get('check') == true){
      this.check = true;
    }
    else{
      this.check = false;
    }
    console.log(this.navParams.get('category'));
    this.log.getCategoryItem(this.navParams.get('category')).subscribe(res => {
		  this.item2=res;
      
      for(var i=0; i<this.item2.length; i++){
          for(var j=0; j<this.shared.getTemplate().length; j++)
          {
              if(this.shared.getTemplate()[j].itemID == this.item2[i].itemID)
              {
                  this.item.push({
                        itemID: this.item2[i].itemID,
                        itemName: this.item2[i].itemName,
                        itemDescription: this.item2[i].itemDescription,
                        itemPrice: this.item2[i].itemPrice,
                        itemQuantityStored: this.item2[i].itemQuantityStored,
                        picture: "http://"+this.item2[i].picture,
                        visible: true,
                    });
                    this.vis=true;
                   console.log("in loop");
              }
          }
          if(!this.vis)
          {
                  console.log("in visible");
                  this.item.push({
                        itemID: this.item2[i].itemID,
                        itemName: this.item2[i].itemName,
                        itemDescription: this.item2[i].itemDescription,
                        itemPrice: this.item2[i].itemPrice,
                        itemQuantityStored: this.item2[i].itemQuantityStored,
                        picture: "http://"+this.item2[i].picture,
                        visible: false,
                    });
                    this.vis=false;
          }
          else
          this.vis=false;
      }

      console.log(this.shared.getTemplate().length)
      

    });
    this.refreshData();
    console.log(this.item);
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
  }

  sendtoTempGet(itemID, itemName, itemDescription, itemPrice, itemQuantityStored, picture, visible){
    //true
    if(visible == false){
      this.tempData.push({
        itemID: itemID,
        itemName: itemName,
        itemDescription: itemDescription,
        itemPrice: itemPrice,
        itemQuantityStored: itemQuantityStored,
        picture: picture,
        visible: true
      }); 
      console.log(itemID);
      for(var i=0; i<this.item.length; i++){
        if(itemID == this.item[i].itemID){
          this.item[i].visible = true;
          console.log(this.item[i].itemID);
        } 
      }
      console.log(this.tempData);
      this.shared.setTemplate(this.tempData);
      this.tempData.pop(); 

//toastControllerStart
      let toast = this.toastCtrl.create({
        message: 'Added ' + itemName,
        duration: 1200,
        position: 'top',
      });

      toast.present();
//toastControllerEnd
    } 
    
    
    //false
    if(visible == true){
      for(var i=0; i<this.shared.getTemplate().length; i++){
        this.tempData2[i] = this.shared.getTemplate()[i];
      }
      console.log(this.tempData2)

      for (var i=0; i<this.tempData2.length; i++){
        if(itemID == this.tempData2[i].itemID){
          this.tempData2.splice(i, 1);
        }
      }
      console.log(this.tempData2)
      console.log(itemID);
      for(var i=0; i<this.item.length; i++){
        if(itemID == this.item[i].itemID){
          this.item[i].visible = false;
          console.log(this.item[i].itemID);
        } 
      }

      this.shared.cleanTemplate();
      for (var i=0; i<this.tempData2.length; i++){
        this.tempData.push({
          itemID: this.tempData2[i].itemID,
          itemName: this.tempData2[i].itemName,
          itemDescription: this.tempData2[i].itemDescription,
          itemPrice: this.tempData2[i].itemPrice,
          itemQuantityStored: this.tempData2[i].itemQuantityStored,
          picture: this.tempData2[i].picture,
          visible: true
      }); 
        this.shared.setTemplate(this.tempData);
        this.tempData.pop();
      }
      //toastControllerStart
      let toast = this.toastCtrl.create({
        message: 'Removed ' + itemName,
        duration: 1200,
        position: 'top',
      });

      toast.present();
//toastControllerEnd
    }

    
  }

  gotoTempGet(){
    if(this.shared.getTemplate().length !=0){
      console.log("to TempGet");
		  this.navCtrl.push(TempGetPage);
    }

    else if(this.shared.getTemplate().length == 0){
      let toast = this.toastCtrl.create({
        message: 'Please select items',
        duration: 900,
        position: 'middle'
    });

      toast.present();
    }
	}
  getItems(ev: any) {
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
   gotoTempEdit(){
    if(this.shared.getTemplate().length !=0){
       console.log("to TempGet");
 		  this.navCtrl.push(TempEditPage, {
         templateID: this.navParams.get('templateID'),
         templateName: this.navParams.get('templateName')
       });
       console.log(this.navParams.get('templateID'));
       console.log(this.navParams.get('templateName'));
     }
 
     else if(this.shared.getTemplate().length == 0){
       let toast = this.toastCtrl.create({
         message: 'Please select items',
         duration: 900,
         position: 'middle'
     });
 
       toast.present();
     }
 	}

    private refreshData(): void {
         
        this.postsSubscription = this.log.getCategoryItem(this.navParams.get('category')).subscribe(

        data  => {
                    console.log(this.stop);
                    if(!this.stop)
                    {
                          console.log(this.item2.length);
                          var k =0;
                          this.item=[];
                          if(this.item2.length !=0)
                          {
                              for(var i=0; i<data.length; i++){
                                    if(this.shared.getTemplate() != 0)
                                    {
                                            for(var j=0; j<this.shared.getTemplate().length; j++)
                                            {
                                                  if(this.shared.getTemplate()[j].itemID == data[i].itemID)
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
                                if(this.shared.getTemplate() == 0)
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
                  console.log(this.item);
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