import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    ChangePayPswPage,GoldMasterPage,CreditGrantingPage,NewsDetailPage
  ],
  imports: [
    BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule,
    ChangePayPswPageModule,GoldMasterPageModule,CreditGrantingPageModule,
    NewsDetailPageModule
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
