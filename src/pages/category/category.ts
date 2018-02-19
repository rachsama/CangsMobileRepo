import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { OrderPage } from '../../pages/order/order';
import { OrderService } from '../../pages/order/order.service';
import { CartPage } from '../../pages/cart/cart';

@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {
    public item: any=[];
    selected:any = [];

    categoryOptions: any = [ "Condiments", "Food", "Drinks", "Others" ];

    constructor( private log: OrderService ,public navCtrl: NavController, public navParams: NavParams) {
        //this.log.getItem().then(res => {
		//    this.item=res;
        //console.log(this.item);
        //});
        this.categoryOptions;
        console.log(this.categoryOptions);
    }

    gotoOrder(cat){
		console.log("to order");
        console.log(cat)
		this.navCtrl.push(OrderPage,{
			category: cat,
		});
	}

}