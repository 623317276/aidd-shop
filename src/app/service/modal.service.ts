import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangePayPswPage } from '../page/change-pay-psw/change-pay-psw.page';
import { GoldMasterPage } from '../page/gold-master/gold-master.page';
import { CreditGrantingPage } from '../page/credit-granting/credit-granting.page';
import { NewsDetailPage } from '../page/news-detail/news-detail.page';
import { SetUpShopPage } from '../page/set-up-shop/set-up-shop.page';
import { EditAddressPage } from '../page/edit-address/edit-address.page';
import { EditNicknamePage } from '../page/edit-nickname/edit-nickname.page';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})

export class ModalService {

  // 弹出页面type对应component
  public componentArr:any = {
    'edit-nickname': EditNicknamePage, // 修改昵称
    'pay': ChangePayPswPage, // 修改支付密码
    'login': ChangePayPswPage, // 修改登陆密码
    'gold-master': GoldMasterPage, // 申请金主
    'credit-granting': CreditGrantingPage, // 申请授信
    'news': NewsDetailPage, // 公告模板
    'set-up-shop': SetUpShopPage, // 申请开店
    'edit-address': EditAddressPage, // 添加、修改收货地址
  };
  public type:string = '';
  constructor(
    public modal: ModalController,
    public toast: ToastService,
    ) { }

    async presentModal(data:any) {
      this.type = data.type;
      if(!this.componentArr[this.type]){
        this.toast.presentToast('找不到模板');
        return false;
      }
      const modal = await this.modal.create({
        component: this.componentArr[this.type],
        componentProps: {data:data}
      });
      return await modal.present();
    }
}
