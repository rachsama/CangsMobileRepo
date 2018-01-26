import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Http } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { OrderPage } from '../pages/order/order';
import { LoginService } from '../pages/login/login.service';


import { AuthProvider } from '../providers/auth/auth';

import { LoadingController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
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
