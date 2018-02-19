import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { TemplatePage } from '../../pages/template/template';

@Component({
    selector: 'page-tempcateg',
    templateUrl: 'tempcateg.html'
})
export class TempCategPage {
    public item: any=[];
    selected:any = [];

    categoryOptions: any = [ "Condiments", "Miscellaneous", "Dairy Products", "Non-chilled Beverages", "Toiletries", "Dry Goods" ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.categoryOptions;
        console.log(this.categoryOptions);
    }

    gotoTemplate(cat){
		console.log("to order");
        console.log(cat)
		this.navCtrl.push(TemplatePage,{
			category: cat,
		});
	}

}