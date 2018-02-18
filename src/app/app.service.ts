import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { NavController, NavParams, Nav } from 'ionic-angular';


import { OrderService } from '../pages/order/order.service';

@Injectable()
export class SharedService{
    user:any;
    cart: any = [];
    post: any = [];
    lisItems: any = [];
    list: any = [];
    private _loginUrl =  'http://192.168.0.24:1025/item/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor(public ord: OrderService, public navParams: NavParams) {
        
    }
  
    setUserName(userName) {
        this.user = userName;    
    }
  
    getUserName() {
        return this.user;
    }

    setListItems(){
        this.ord.getCategoryItem(this.navParams.get('category')).then(res => {
		  this.lisItems=res;

        for(var i=0; i<this.lisItems.length; i++){
            this.list.push({
                itemID: this.lisItems[i].itemID,
                itemName: this.lisItems[i].itemName,
                itemDescription: this.lisItems[i].itemDescription,
                itemPrice: this.lisItems[i].itemPrice,
                itemQuantityStored: this.lisItems[i].itemQuantityStored,
                picture: "http://"+this.lisItems[i].picture,
                visible: false,
            });
        }
        });
    }

    getListItems(){
        return this.list;
    }

    setCart(cartData){
        this.cart.push( {
            itemID: cartData[0].itemID,
            itemName: cartData[0].itemName,
            itemDescription: cartData[0].itemDescription,
            itemPrice: cartData[0].itemPrice,
            itemQuantityStored: cartData[0].itemQuantityStored,
            picture: cartData[0].picture,
            visible: cartData[0].visible
        });
        console.log(this.cart);
    }

    getCart(){
        return this.cart;
    }

    cleanCart(){
        this.cart = [];
    }

    removeCart(){
        
    }
}