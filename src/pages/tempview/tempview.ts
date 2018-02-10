import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { LoginService } from '../../pages/login/login.service';
import { TempViewService } from '../../pages/tempview/tempview.service';
import { CartPage } from '../../pages/cart/cart';

@Component({
  selector: 'page-tempview',
  templateUrl: 'tempview.html'
})
export class TempViewPage {
  public item: any=[];
  public cartData: any=[];
  selected:any = [];

  constructor( private tempv: TempViewService ,public navCtrl: NavController, public navParams: NavParams) {
    this.tempv.getTemplate().then(res => {

		this.item=res;
        console.log(this.item);

        for(var i=0; i<this.item.length; i++){

            if(this.item.customerID=10016/*LoginService.customerID*/){
                for(var x=0; i<this.item.length; x++){
                    this.item[x] = this.item[i];
                }
            }
      }
    });
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
    console.log(this.item);
  }

  /*sendtoCart(itemID, itemName, itemDescription, itemPrice, itemQuantityStored, picture){
    this.cartData.push({
      itemID: itemID,
      itemName: itemName,
      itemDescription: itemDescription,
      itemPrice: itemPrice,
      itemQuantityStored: itemQuantityStored,
      picture: picture
    }); 
    console.log(this.cartData);
  }

  gotoCart(){
		console.log("to cart");
		this.navCtrl.push(CartPage,{
			cartData: this.cartData,
      user:this.navParams.get('data1'),
		});
	}*/

}