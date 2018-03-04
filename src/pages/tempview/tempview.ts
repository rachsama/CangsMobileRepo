import { Component } from '@angular/core';
import { NavController, NavParams, Nav, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { LoginService } from '../../pages/login/login.service';
import { TempViewService } from '../../pages/tempview/tempview.service';
import { SeeTempPage } from '../../pages/seetemp/seetemp';
import { LoginPage } from '../../pages/login/login';
import { SharedService } from '../../app/app.service';
import { TempCategPage } from '../../pages/tempcateg/tempcateg';
import { SeeTempService } from '../../pages/seetemp/seetemp.service';
import { OrderService } from '../../pages/order/order.service';
@Component({
  selector: 'page-tempview',
  templateUrl: 'tempview.html'
})
export class TempViewPage {
  public item: any=[];
  selected:any = [];
  public temp: any=[];
  public cartData: any=[];
  constructor(public tvserv: TempViewService, public ord: OrderService, public seet: SeeTempService,private shared: SharedService, private network: Network, public toastCtrl:ToastController ,private tempv: TempViewService ,public navCtrl: NavController, public navParams: NavParams) {
    this.tempv.getTemplate().subscribe(res => {
		  this.item=res;
      console.log(this.item);
    });
    console.log(this.item);
//Network
				this.network.onConnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is online',
						duration: 2500,
					}).present();
				});

				this.network.onDisconnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is offline',
						duration: 2500,
					}).present();
          this.shared.clearUserName();
          this.navCtrl.setRoot(LoginPage);
				});
//Network
  }

 seeTemplate(templateID, templateName){
    this.navCtrl.push(SeeTempPage, {
       templateID: templateID,
      templateName: templateName
    })
    console.log(templateID);
     console.log(templateName);
  }
  gotoTempCateg(){
     this.shared.cleanTemplate();
     this.navCtrl.push(TempCategPage)
   }
 
   /*edit(templateID){
     this.shared.cleanTemplate();
     console.log(templateID)
     this.seet.getTemplateDetails(templateID).then(res => {
 		    this.temp=res;
         console.log(this.temp)
         for(var i=0; i<this.temp.length; i++){
           this.ord.getTempItem(this.temp[i].itemID).then(data => {
             data[0].picture = "http://" + data[0].picture;
               this.cartData.push({
                 itemID: data[0].itemID,
                 itemName: data[0].itemName,
                 itemDescription: data[0].itemDescription,
                 itemPrice: data[0].itemPrice,
                 itemQuantityStored: data[0].itemQuantityStored,
                 picture: data[0].picture,
                 subTotal:data[0].itemPrice,
                 visible: true
               });
 
               this.shared.setTemplate(this.cartData);
               this.cartData.pop();
           })
         }
     })
 
     this.navCtrl.push(TempCategPage);
   }*/
    delTemp(templateID){
        this.tvserv.deleteTemplate(templateID);
        //this.navCtrl.setRoot(TempCategPage);
        this.tempv.getTemplate().subscribe(data => {
           
            var i=0;
               for (let temp of data)
                {
                        
                                //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                                //console.log(data);
                                this.item[i]=({
                                    'templateID': temp.templateID, 
                                    'customerID': temp.customerID, 
                                    'templateName': temp.templateName, 
                        			
                                });
                                i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                                
                                //console.log(item);
                                //console.log(i);
                        }
                        if(i < this.item.length)
                        {
                            let dif = this.item.length - i;
                            let test;
                            for(dif;dif>0;dif--)
                            {
                                    test=this.item.pop();
                                    console.log(test);
                            }
                }
                        i=0;   
        });
        
      }

}