import { Component } from '@angular/core';
import { ModalController, Platform , NavParams, ViewController,NavController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';
import { OrderService } from '../../pages/order/order.service';
import { SharedService } from '../../app/app.service';
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  public customer:any =[];
  public details:any=[];
  public total:any="test";
  public newcart:any=[];
  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public ord:OrderService,
              public viewCtrl: ViewController,
              public shared:SharedService) {
      this.customer = this.navParams.get('customer');
      this.details = this.navParams.get('details');
      this.total = this.navParams.get('total');
      //console.log(this.total);
      //console.log(this.customer);
      //console.log(this.details);
  }

    dismiss(data) {
            this.viewCtrl.dismiss(data);
    }
    order(){
            
            console.log(this.details);
            for(var i=0;i<this.details.length;i++)
            {
                console.log("to asdf");
               this.ord.get1Item(this.details[i].itemID).then(data =>{
                 console.log(data);
                    data[0].picture = "http://" + data[0].picture;
                    this.newcart.push({
                          itemID: data[0].itemID,
                          itemName: data[0].itemName,
                          itemDescription: data[0].itemDescription,
                          itemPrice: data[0].itemPrice,
                          itemQuantityStored: data[0].itemQuantityStored,
                          picture: data[0].picture,
                          subTotal:data[0].itemPrice,
                          visible: false,
                    });
                    this.shared.setCart(this.newcart);
                    this.newcart.pop();
               });
            }
            console.log(this.newcart);
            
            setTimeout (() => {
                this.navCtrl.push(CartPage,{
                   // cartData: this.newcart,
                    user:this.shared.getUserName(),//this.navParams.get('data1')
                });
            }, 1000)
	  }
}