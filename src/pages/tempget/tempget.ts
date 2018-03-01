import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { TemplateService } from '../../pages/template/template.service';
import { TempCategPage } from '../../pages/tempcateg/tempcateg';
import { TempViewPage } from '../../pages/tempview/tempview';
import { LoginService } from '../../pages/login/login.service';
import { SharedService } from '../../app/app.service';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tempget',
  templateUrl: 'tempget.html',
})
export class TempGetPage {
    public tempgetData: any=[];
    public sendTemp: any=[];

    constructor(private network: Network, 
                private toastCtrl: ToastController ,
                public navCtrl: NavController, 
                public navParams: NavParams, 
                public tem: TemplateService,
                public viewCtrl:ViewController, 
                public log:LoginService, 
                public shared: SharedService) {
        for(var i=0; i<this.shared.getTemplate().length; i++){
            this.tempgetData[i] = this.shared.getTemplate()[i];
        }

    console.log(this.shared.getTemplate()); 
//Network
				this.network.onConnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is Online',
						duration: 2500,
					}).present();
				});

				this.network.onDisconnect().subscribe(() => {
					this.toastCtrl.create({
						message: 'Device is Offline',
						duration: 2500,
					}).present();
          this.shared.clearUserName();
          this.navCtrl.setRoot(LoginPage);
				});
//Network
    }

    addTemplate(tempName){

        console.log(this.shared.getTemplate()); 
        if(tempName == null || tempName == ""){
            let toast = this.toastCtrl.create({
            message: 'Please Fill Template Name',
            duration: 3000,
            position: 'middle'
        });

        toast.present();
        }
        else if(tempName != null || tempName != ""){
            this.sendTemp.push({
                "customerID": this.shared.getUserName(),//LoginService.customerID,
                "templateName": tempName
            });
            console.log(this.sendTemp);
            console.log(this.tempgetData);
            this.tem.makeTemplate(this.sendTemp[0],this.tempgetData);
            this.shared.cleanTemplate();
            this.viewCtrl.showBackButton(false);
            setTimeout (() => {
            this.viewCtrl.showBackButton(true);
             //this.menu.enable(true,"myMenu");
            this.navCtrl.setRoot(TempViewPage)
            }, 3000)	
            /* let toast = this.toastCtrl.create({
                    message: 'The Template has been Successfully Created!',
                    duration: 2000,//kini siya
                    position: 'middle'
            });
            toast.present();*/
        }
    }

}