import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { TemplateService } from '../../pages/template/template.service';
import { TempGetPage } from '../../pages/tempget/tempget';

@Component({
  selector: 'page-template',
  templateUrl: 'template.html'
})
export class TemplatePage {
    public item: any=[];
    public tempData: any=[];
    selected:any = [];

    constructor( private log: TemplateService ,public navCtrl: NavController, public navParams: NavParams) {
    this.log.getItem().then(res => {
        this.item=res;
        console.log(this.item);

        for(var i=0; i<this.item.length; i++){
            this.item[i].picture = "http://" + this.item[i].picture;
        }
    });
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
    }

    sendtoTempGet(itemID, itemName, itemDescription, picture){
        this.tempData.push({
            itemID: itemID,
            itemName: itemName,
            itemDescription: itemDescription,
            picture: picture
    }); 
    console.log(this.tempData);
    }

    gotoTempGet(){
		    this.navCtrl.push(TempGetPage,{
			    tempData: this.tempData,
		    });
		    console.log("tempData");
            console.log(this.tempData);
	}

}