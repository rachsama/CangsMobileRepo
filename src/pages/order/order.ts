import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';
import { CategoryPage }from '../../pages/category/category';
import { SharedService } from '../../app/app.service';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  public item: any=[];
  public cartData: any=[];
  public cartData2: any=[];
  selected:any = [];
  public item2: any=[];
  vis:boolean=false;
  constructor( private log: OrderService ,public navCtrl: NavController, public navParams: NavParams, private shared: SharedService) {
    console.log(this.navParams.get('category'));
    this.log.getCategoryItem(this.navParams.get('category')).then(res => {
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

      console.log(this.shared.getCart().length)
      

    });
    console.log(this.item);
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
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
        visible: true
      }); 
      console.log(itemID);
      for(var i=0; i<this.item.length; i++){
        if(itemID == this.item[i].itemID){
          this.item[i].visible = true;
          console.log(this.item[i].itemID);
        } 
      }
      console.log(this.cartData);
      this.shared.setCart(this.cartData);
      this.cartData.pop(); 
    } 
    
    
    //false
    if(visible == true){
      for(var i=0; i<this.shared.getCart().length; i++){
        this.cartData2[i] = this.shared.getCart()[i];
      }
      console.log(this.cartData2)

      for (var i=0; i<this.cartData2.length; i++){
        if(itemID == this.cartData2[i].itemID){
          this.cartData2.splice(i, 1);
        }
      }
      console.log(this.cartData2)
      console.log(itemID);
      for(var i=0; i<this.item.length; i++){
        if(itemID == this.item[i].itemID){
          this.item[i].visible = false;
          console.log(this.item[i].itemID);
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
    }

    
  }

  gotoCart(){
		console.log("to cart");
		this.navCtrl.push(CartPage);
	}


}