import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Http } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { HistoryPage } from '../pages/history/history';
import { LoginService } from '../pages/login/login.service';


import { AuthProvider } from '../providers/auth/auth';
import { LoadingController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  constructor(public auth: AuthProvider, public loadingCtrl: LoadingController) {

    /*this.presentLoading();

    this.auth.login().then((isLoggedIn) => {
      if(isLoggedIn){
        this.rootPage = OrderPage;
      }

      else{
        this.rootPage = LoginPage;
      }

      //this.loader.dismiss();
    })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
  }*/
  }
}
