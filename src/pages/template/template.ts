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

    constructor(private network: Network,private toastCtrl: ToastController, private log: OrderService ,public navCtrl: NavController, public navParams: NavParams, private shared: SharedService) {
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
    console.log(this.item);
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
        message: 'Please Select Items',
        duration: 900,
        position: 'middle'
    });

      toast.present();
    }
	}


}