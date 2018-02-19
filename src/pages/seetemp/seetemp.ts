import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartPage } from '../../pages/cart/cart';
import { OrderService } from '../../pages/order/order.service';
import { SeeTempService } from '../../pages/seetemp/seetemp.service';
import { LoginService } from '../../pages/login/login.service';
import { TempViewService } from '../../pages/tempview/tempview.service';
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

    constructor( public navCtrl: NavController, public navParams: NavParams, public log:LoginService, public seet:SeeTempService, public ord: OrderService) {
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
                picture: data[0].picture
              })
          });
        }
        
        console.log(this.cartData)
      });

    }

    gotoCart(){
		console.log("to cart");
		this.navCtrl.push(CartPage);
	  }
    
}