import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { LoginService } from '../../pages/login/login.service';
import { TempViewService } from '../../pages/tempview/tempview.service';
import { SeeTempPage } from '../../pages/seetemp/seetemp';

@Component({
  selector: 'page-tempview',
  templateUrl: 'tempview.html'
})
export class TempViewPage {
  public item: any=[];
  selected:any = [];

  constructor( private tempv: TempViewService ,public navCtrl: NavController, public navParams: NavParams) {
    this.tempv.getTemplate().then(res => {
		  this.item=res;
      console.log(this.item);
    });
    console.log(this.navParams.get('data1'));
    console.log(this.navParams.get('data2'));
    console.log(this.item);
  }

  seeTemplate(templateID){
    this.navCtrl.push(SeeTempPage, {
      templateID: templateID
    })
    console.log(templateID);
  }
  

}