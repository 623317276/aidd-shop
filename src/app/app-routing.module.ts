import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginguardService, UnloginguardService } from './service/loginguard.service';

const routes: Routes = [
  
  // 不登陆才能访问的页面
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule', canActivate: [UnloginguardService]},


  // 登陆才能访问的页面
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' , canActivate: [LoginguardService]},
  { path: 'shop-info/:id', loadChildren: './page/shop-info/shop-info.module#ShopInfoPageModule', canActivate:[LoginguardService]},
  { path: 'shop-diy', loadChildren: './page/shop-diy/shop-diy.module#ShopDiyPageModule', canActivate:[LoginguardService]},
  { path: 'change-pay-psw', loadChildren: './page/change-pay-psw/change-pay-psw.module#ChangePayPswPageModule' , canActivate:[LoginguardService]},
  { path: 'cash-detail/:type', loadChildren: './page/cash-detail/cash-detail.module#CashDetailPageModule', canActivate:[LoginguardService] },
  { path: 'wealth', loadChildren: './page/wealth/wealth.module#WealthPageModule', canActivate:[LoginguardService] },


  // 都能访问的页面
  { path: 'reg', loadChildren: './page/reg/reg.module#RegPageModule' },
  // { path: 'borrow', loadChildren: './page/borrow/borrow.module#BorrowPageModule' },
  // { path: 'gold-master', loadChildren: './page/gold-master/gold-master.module#GoldMasterPageModule' },
  // { path: 'credit-granting', loadChildren: './page/credit-granting/credit-granting.module#CreditGrantingPageModule' },
  { path: 'invitation', loadChildren: './page/invitation/invitation.module#InvitationPageModule' },
  { path: 'news-detail', loadChildren: './page/news-detail/news-detail.module#NewsDetailPageModule' },  { path: 'address', loadChildren: './page/address/address.module#AddressPageModule' },
  { path: 'set-up-shop', loadChildren: './page/set-up-shop/set-up-shop.module#SetUpShopPageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
