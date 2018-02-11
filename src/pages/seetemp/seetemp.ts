import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public orderData: any=[];
    public sendOrder: any=[];

    constructor( public navCtrl: NavController, public navParams: NavParams, public log:LoginService, public seet:SeeTempService) {
        this.seet.getTemplateDetails(this.navParams.get('templateID')).then(res => {
		  this.item=res;
      console.log();

      for(var i=0; i<this.item.length; i++){
                this.item[i] = this.item[i];
      }
    });
    }

    /*addOrder(delLocation, packaging, delTime, remarks, coh){
      for(var i=0; i<this.orderData.length; i++){
        console.log(this.orderData[i].quantity)
        this.total += this.orderData[i].itemPrice * this.orderData[i].quantity; 
      }    console.log(this.total);
      
      let time = new Date();
        console.log(time);
        let mm =time.getMonth();
        let dd =time.getDate();
        let yy =time.getFullYear();
        let hh =time.getHours();
        let ss =time.getSeconds();
        let min =time.getMinutes();
        let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + min + ":" + ss;

      this.sendOrder.push({
      "orderDate": timestamp,
      "orderTotal": this.total,
      "orderStatus": 'pending',
      "orderRemarks": remarks,
      "location": delLocation,
      "orderTime": delTime,
      "packaging": packaging,
      "customerID": LoginService.customerID,
      "cashTendered": coh,
    });
    console.log(this.sendOrder);
    this.ord.makeOrder(this.sendOrder[0],this.orderData);
  }*/

}
