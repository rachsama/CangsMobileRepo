import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TemplateService } from '../../pages/template/template.service';
import { LoginService } from '../../pages/login/login.service';
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

    constructor( public navCtrl: NavController, public navParams: NavParams, public tem: TemplateService, public log:LoginService) {
        for(var i=0; i<this.navParams.get('tempData').length; i++){
            this.tempgetData[i] = this.navParams.get('tempData')[i];
        }

    console.log(this.navParams.get('tempData')); 
    }

    addTemplate(tempName){
    console.log(this.navParams.get('tempgetData')); 

        this.sendTemp.push({
            "customerID": 10016,//LoginService.customerID,
            "templateName": tempName
        });
        console.log(this.sendTemp);
        console.log(this.tempgetData);
        this.tem.makeTemplate(this.sendTemp[0],this.tempgetData);
    }

}
