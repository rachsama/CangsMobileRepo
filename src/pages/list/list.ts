import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../pages/list/list.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public itm: any=[];
  selectedItem: any;
  items: Array<{title: string, note: string, image: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    
    for(let data of this.itm) {
      this.items.push({

        title: data.itemID,
        note: data.itemPrice,
        image: data.picture
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
