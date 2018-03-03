import { Component } from '@angular/core';
 import { IonicPage, NavController, NavParams, ToastController,ViewController } from 'ionic-angular';
 import { Network } from '@ionic-native/network';
 
 import { TemplateService } from '../../pages/template/template.service';
 import { TempViewPage } from '../../pages/tempview/tempview';
 import { TempViewService } from '../../pages/tempview/tempview.service';
 import { LoginService } from '../../pages/login/login.service';
 import { SharedService } from '../../app/app.service';
 import { LoginPage } from '../../pages/login/login';
 import { SeeTempService } from '../../pages/seetemp/seetemp.service';
 /**
  * Generated class for the CartPage page.
  *
  * See https://ionicframework.com/docs/components/#navigation for more info on
  * Ionic pages and navigation.
  */
 
 @IonicPage()
 @Component({
   selector: 'page-tempedit',
   templateUrl: 'tempedit.html',
 })
 export class TempEditPage {
     public tempgetData: any=[];
     public sendEdits: any=[];
     public item: any=[];
     public templateName: string;
 
     constructor(private network: Network, 
                 private toastCtrl: ToastController ,
                 public navCtrl: NavController, 
                 public navParams: NavParams, 
                 public tem: TemplateService,
                 public viewCtrl: ViewController, 
                 public tvserv: TempViewService,
                 public log: LoginService,
                 public seet: SeeTempService,
                 public shared: SharedService) {
         console.log(this.navParams.get('templateName'));
         this.templateName = this.navParams.get('templateName');
         for(var i=0; i<this.shared.getTemplate().length; i++  ){
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
 
     saveEditTemplate(tempName){
 
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
             this.sendEdits.push({
                 "templateID": this.navParams.get('templateID'),//LoginService.customerID,
                 "templateName": tempName,
                 "customerID": this.shared.getUserName()
             });
 
             for(var i=0 ; i<this.tempgetData.length ; i++  ){
                 
             }
             console.log(this.sendEdits);
             console.log(this.tempgetData);
             //this.tvserv.editTemp(this.sendEdits[0]);
             this.tvserv.editTemp(this.sendEdits);
 
             this.tvserv.giveTempID(this.navParams.get('templateID')).then(res => {
 		        this.item=res;
                 for(var i=0; i<this.item.length; i  ){
                     this.tvserv.delTempDe(this.item[i]);
                 }
             });
             this.tvserv.addEditedTemDe(this.tempgetData, this.navParams.get('templateID'));
             this.navCtrl.setRoot(TempViewPage);
         
         }
     }
 
 } 