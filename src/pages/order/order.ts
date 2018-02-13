import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';
import { CategoryPage }from '../../pages/category/category';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  public item: any=[];
  public cartData: any=[];
  selected:any = [];

  constructor( private log: OrderService ,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('category'));
    this.log.getCategoryItem(this.navParams.get('category')).then(res => {
		  this.item=res;
      
      for(var i=0; i<this.item.length; i++){
        this.item[i].picture = "http://" + this.item[i].picture;
      }
    });
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
  }

  sendtoCart(itemID, itemName, itemDescription, itemPrice, itemQuantityStored, picture){
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
		});
	}

}