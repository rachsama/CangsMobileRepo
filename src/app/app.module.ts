import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginService } from '../pages/login/login.service';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';

import { AuthProvider } from '../providers/auth/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    OrderPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    OrderPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LoginService,
    Md5
  ]
})
export class AppModule {}
