import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ChangePayPswPage } from './page/change-pay-psw/change-pay-psw.page';
import { ChangePayPswPageModule } from './page/change-pay-psw/change-pay-psw.module';
import { GoldMasterPage } from './page/gold-master/gold-master.page';
import { GoldMasterPageModule } from './page/gold-master/gold-master.module';
import { CreditGrantingPage } from './page/credit-granting/credit-granting.page';
import { CreditGrantingPageModule } from './page/credit-granting/credit-granting.module';
import { NewsDetailPage } from './page/news-detail/news-detail.page';
import { NewsDetailPageModule } from './page/news-detail/news-detail.module';
import { AddressPage } from './page/address/address.page';
import { AddressPageModule } from './page/address/address.module';
import { SetUpShopPage } from './page/set-up-shop/set-up-shop.page';
import { SetUpShopPageModule } from './page/set-up-shop/set-up-shop.module';
import { EditAddressPage } from './page/edit-address/edit-address.page';
import { EditAddressPageModule } from './page/edit-address/edit-address.module';
import { EditNicknamePage } from './page/edit-nickname/edit-nickname.page';
import { EditNicknamePageModule } from './page/edit-nickname/edit-nickname.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    ChangePayPswPage,GoldMasterPage,CreditGrantingPage,NewsDetailPage,
    AddressPage,SetUpShopPage,EditAddressPage,EditNicknamePage
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgZorroAntdMobileModule,
    ChangePayPswPageModule,
    GoldMasterPageModule,
    CreditGrantingPageModule,
    NewsDetailPageModule,
    AddressPageModule,
    EditAddressPageModule,
    SetUpShopPageModule,
    BrowserAnimationsModule,
    EditNicknamePageModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){}

  
}
