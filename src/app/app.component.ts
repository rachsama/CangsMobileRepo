import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';


import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { EditInfoPage } from '../pages/editinfo/editinfo';
import { ResetPage } from '../pages/resetpass/resetpass';
import { HistoryPage } from '../pages/history/history';

import { TemplatePage } from '../pages/template/template';
import { TempViewPage } from '../pages/tempview/tempview';

@Component({
  selector: 'app-page',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HistoryPage;

  pages: Array<{title: string, component: any}>;
  logout: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Make Orders', component: OrderPage },
      { title: 'Create Templates', component: TemplatePage },
      { title: 'View Templates', component: TempViewPage },
      { title: 'Edit Information', component: EditInfoPage },
      { title: 'Reset Password', component: ResetPage },
      { title: 'Purchase History', component: HistoryPage }
    ];
    this.logout = [
      { title: 'Log-out', component: LoginPage },
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  out(logout) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(logout);
  }
}
