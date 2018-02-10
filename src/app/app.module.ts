import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';

import { HistoryPage } from '../pages/history/history';

import { ModalPage } from '../pages/history/modal-page';

import { LoginService } from '../pages/login/login.service';
import { OrderService } from '../pages/order/order.service';
import { CartPage } from '../pages/cart/cart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    OrderPage,
    HistoryPage,
    ModalPage,
    CartPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    OrderPage,
    HistoryPage,
    ModalPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    OrderService,
    OrderPage,
    Md5
  ]
})
export class AppModule {}
