import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';

import { MyApp } from './app.component';
import { SharedService } from './app.service';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { ResetPage } from '../pages/resetpass/resetpass';
import { HistoryPage } from '../pages/history/history';
import { EditInfoPage } from '../pages/editinfo/editinfo';
//import { CartPage } from '../pages/cart/cart';
import { CartPageModule } from '../pages/cart/cart.module';
import { ModalPage } from '../pages/history/modal-page';
import { TemplatePage } from '../pages/template/template';
//import { TempGetPage } from '../pages/tempget/tempget';
import { TempGetPageModule } from '../pages/tempget/tempget.module';
import { TempViewPage } from '../pages/tempview/tempview';
//import { SeeTempPage } from '../pages/seetemp/seetemp';
import { SeeTempPageModule } from '../pages/seetemp/seetemp.module';
import { CategoryPage } from '../pages/category/category';

import { TempCategPage } from '../pages/tempcateg/tempcateg';
import { ForgotPassPage } from '../pages/forgotpass/forgotpass';
import { Network } from '@ionic-native/network';

import { LoginService } from '../pages/login/login.service';
import { TemplateService } from '../pages/template/template.service';
import { OrderService } from '../pages/order/order.service';
import { TempViewService } from '../pages/tempview/tempview.service';
import { SeeTempService } from '../pages/seetemp/seetemp.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { OrderFilterPipe } from '../pages/order/order-pipe';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    OrderPage,
    HistoryPage,
    ForgotPassPage,
   // CartPage,
    TemplatePage,
   // TempGetPage,
    TempViewPage,
  //  SeeTempPage,
    EditInfoPage,
    ResetPage,
    ModalPage,
    CategoryPage,
    TempCategPage,
    OrderFilterPipe,
  ],
  imports: [
    HttpModule,
    CartPageModule,
    BrowserModule,
    TempGetPageModule,
    SeeTempPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    OrderPage,
    HistoryPage,
   // CartPage,
    TemplatePage,
    ForgotPassPage,
   // TempGetPage,
    TempViewPage,
  //  SeeTempPage,
    EditInfoPage,
    ResetPage,
    ModalPage,
    CategoryPage,
    TempCategPage
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
    SharedService,
    Md5,
    Network,
    OrderFilterPipe
  ]
})
export class AppModule {}
