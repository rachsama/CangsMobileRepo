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
  selector: 'page-seetemp',
  templateUrl: 'seetemp.html',
})
export class SeeTempPage {
    public item: any=[];
    public temp: any=[];
    public cartData: any=[];
    public tempItems: any=[];

    constructor(private network: Network,private toastCtrl: ToastController, public tvserv: TempViewService, public shared: SharedService, public navCtrl: NavController, public navParams: NavParams, public log:LoginService, public seet:SeeTempService, public ord: OrderService) {
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
                visible: true
              })
              this.shared.setCart(this.cartData);
              this.tempItems.push({
                itemID: this.cartData[0].itemID,
                itemName: this.cartData[0].itemName,
                itemDescription: this.cartData[0].itemDescription,
                itemPrice: this.cartData[0].itemPrice,
                itemQuantityStored: this.cartData[0].itemQuantityStored,
                picture: this.cartData[0].picture,
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
    console.log(this.shared.getCart())
		this.navCtrl.push(CartPage);
	  }

    delTemp(){
      this.tvserv.deleteTemplate(this.navParams.get('templateID'));
      this.navCtrl.setRoot(TempCategPage);

//toastControllerStart
      let toast = this.toastCtrl.create({
        message: 'HypeBeast',
        duration: 1500,
        position: 'top',
      });

      toast.present();
//toastControllerEnd
    }
    
}
