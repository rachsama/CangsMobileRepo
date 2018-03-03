import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { CartPage } from '../../pages/cart/cart';
import { OrderService } from '../../pages/order/order.service';
import { SeeTempService } from '../../pages/seetemp/seetemp.service';
import { LoginService } from '../../pages/login/login.service';
import { TempViewService } from '../../pages/tempview/tempview.service';
import { TempViewPage } from '../../pages/tempview/tempview';
import { SharedService } from '../../app/app.service';
import { LoginPage } from '../../pages/login/login';
import { TempCategPage } from '../../pages/tempcateg/tempcateg';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seetemp',//FINISH HYPEBEAST
  templateUrl: 'seetemp.html',
})
export class SeeTempPage {
    public item: any=[];
    public temp: any=[];
    public editData: any=[];
    public cartData: any=[];
    public tempItems: any=[];
    check: boolean=false; //new

    constructor(private network: Network,private toastCtrl: ToastController, public tvserv: TempViewService, public shared: SharedService, public navCtrl: NavController, public navParams: NavParams, public log:LoginService, public seet:SeeTempService, public ord: OrderService) {
      this.check = false; //new
      console.log(this.navParams.get('templateName'));
      this.seet.getTemplateDetails(this.navParams.get('templateID')).then(res => {
		    this.temp=res;
        console.log(this.temp)
        for(var i=0; i<this.temp.length; i++){
          this.ord.getTempItem(this.temp[i].itemID).then(data => {
            data[0].picture = "http://" + data[0].picture;
              this.cartData.push({
                itemID: data[0].itemID,
                itemName: data[0].itemName,
                itemDescription: data[0].itemDescription,
                itemPrice: data[0].itemPrice,
                itemQuantityStored: data[0].itemQuantityStored,
                picture: data[0].picture,
                subTotal:data[0].itemPrice,
                visible: true
              })
            //  this.shared.setCart(this.cartData);
              this.tempItems.push({
                itemID: this.cartData[0].itemID,
                itemName: this.cartData[0].itemName,
                itemDescription: this.cartData[0].itemDescription,
                itemPrice: this.cartData[0].itemPrice,
                itemQuantityStored: this.cartData[0].itemQuantityStored,
                picture: this.cartData[0].picture,
                subTotal:data[0].itemPrice,
                visible: true
              })
              this.cartData.pop();
          });
          
        }
        
        console.log(this.cartData)
      });

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

    gotoCart(){
		console.log("to cart");
    this.shared.cleanCart();
    console.log(this.shared.getCart())
     for(var i=0; i<this.tempItems.length; i++){
      console.log(this.tempItems[i])
      this.cartData.push({
        itemID: this.tempItems[i].itemID,
        itemName: this.tempItems[i].itemName,
        itemDescription: this.tempItems[i].itemDescription,
        itemPrice: this.tempItems[i].itemPrice,
        itemQuantityStored: this.tempItems[i].itemQuantityStored,
        picture: this.tempItems[i].picture,
        subTotal:this.tempItems[i].itemPrice,
        visible: true
      })
      this.shared.setCart(this.cartData);
      this.cartData.pop();
    }
		this.navCtrl.push(CartPage);
	  }
    
    edit(){
    this.check = true;
    this.shared.cleanTemplate();
    console.log(this.navParams.get('templateID'))
    this.seet.getTemplateDetails(this.navParams.get('templateID')).then(res => {
		    this.temp=res;
        console.log(this.temp)
        for(var i=0; i<this.temp.length; i++){
          this.ord.getTempItem(this.temp[i].itemID).then(data => {
            data[0].picture = "http://" + data[0].picture;
              this.editData.push({
                itemID: data[0].itemID,
                itemName: data[0].itemName,
                itemDescription: data[0].itemDescription,
                itemPrice: data[0].itemPrice,
                itemQuantityStored: data[0].itemQuantityStored,
                picture: data[0].picture,
                subTotal:data[0].itemPrice,
                visible: true
              });

              this.shared.setTemplate(this.editData);
              this.editData.pop();
          })
        }
    })
    console.log(this.shared.getTemplate()); //delete later
    this.navCtrl.push(TempCategPage,{
      check: this.check,
      templateID: this.navParams.get('templateID'),
      templateName: this.navParams.get('templateName')
    });
    console.log(this.navParams.get('templateName'));// delete
  }
}