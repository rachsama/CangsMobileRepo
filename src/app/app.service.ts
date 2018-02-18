import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { NavController, NavParams, Nav } from 'ionic-angular';


@Injectable()
export class SharedService{
    user:any;
    cart: any = [];
    post: any = [];
    private _loginUrl =  'http://192.168.0.24:1025/item/all';
    private _apiUrl =  'http://192.168.0.24:1025';
    constructor() {
    }
  
    setUserName(userName) {
        this.user = userName;    
    }
  
    getUserName() {
        return this.user;
    }

    /*setListItems(post){
        for(var i=0; i<post.length; i++){
            post.push({
                itemID: post[i].itemID,
                itemName: post[i].itemName,
                itemDescription: post[i].itemDescription,
                itemPrice: post[i].itemPrice,
                itemQuantityStored: post[i].itemQuantityStored,
                picture: "http://"+post[i].picture,
                visible: false,
            });
            }
    }

    getListItems(){
        return this.post;
    }*/

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