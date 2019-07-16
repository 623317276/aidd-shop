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
  { path: 'address', loadChildren: './page/address/address.module#AddressPageModule' , canActivate:[LoginguardService]},
  { path: 'set-up-shop', loadChildren: './page/set-up-shop/set-up-shop.module#SetUpShopPageModule' , canActivate:[LoginguardService]},
  { path: 'edit-address', loadChildren: './page/edit-address/edit-address.module#EditAddressPageModule' , canActivate:[LoginguardService]},
  { path: 'wealth-list', loadChildren: './page/wealth-list/wealth-list.module#WealthListPageModule' , canActivate:[LoginguardService]},
  { path: 'my-shop', loadChildren: './page/my-shop/my-shop.module#MyShopPageModule' , canActivate:[LoginguardService]},
  { path: 'manage-goods', loadChildren: './page/manage-goods/manage-goods.module#ManageGoodsPageModule' , canActivate:[LoginguardService]},
  { path: 'manage-edit-goods/:id', loadChildren: './page/manage-edit-goods/manage-edit-goods.module#ManageEditGoodsPageModule' , canActivate:[LoginguardService]},

  // 都能访问的页面
  { path: 'reg/:pmobile', loadChildren: './page/reg/reg.module#RegPageModule' },
  // { path: 'borrow', loadChildren: './page/borrow/borrow.module#BorrowPageModule' },
  // { path: 'gold-master', loadChildren: './page/gold-master/gold-master.module#GoldMasterPageModule' },
  // { path: 'credit-granting', loadChildren: './page/credit-granting/credit-granting.module#CreditGrantingPageModule' },
  { path: 'invitation', loadChildren: './page/invitation/invitation.module#InvitationPageModule' },
  { path: 'news-detail', loadChildren: './page/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'manage-order', loadChildren: './page/manage-order/manage-order.module#ManageOrderPageModule' },
  { path: 'edit-nickname', loadChildren: './page/edit-nickname/edit-nickname.module#EditNicknamePageModule' },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
