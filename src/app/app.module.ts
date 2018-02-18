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
import { CartPage } from '../pages/cart/cart';
import { TemplatePage } from '../pages/template/template';
import { TempGetPage } from '../pages/tempget/tempget';
import { TempViewPage } from '../pages/tempview/tempview';
import { SeeTempPage } from '../pages/seetemp/seetemp';
import { CategoryPage } from '../pages/category/category';
import { SharedService } from '../app/app.service';

import { LoginService } from '../pages/login/login.service';
import { TemplateService } from '../pages/template/template.service';
import { OrderService } from '../pages/order/order.service';
import { TempViewService } from '../pages/tempview/tempview.service';
import { SeeTempService } from '../pages/seetemp/seetemp.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    OrderPage,
    HistoryPage,
    CartPage,
    TemplatePage,
    TempGetPage,
    TempViewPage,
    SeeTempPage,
    CategoryPage
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
    CartPage,
    TemplatePage,
    TempGetPage,
    TempViewPage,
    SeeTempPage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    OrderService,
    OrderPage,
    TemplateService,
    TempViewService,
    SeeTempService,
    Md5,
    SharedService
  ]
})
export class AppModule {}
