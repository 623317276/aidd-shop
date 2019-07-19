import { Injectable } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CommonService {
  public update:Subject<string> = new Subject<string>();
  public userInfo: any = [];
  
  public appDomain: string = 'http://app.whatphp.com/'; // 用于邀请页面使用
  // public domain: string = 'http://www.whatphp.com/'; // 正式环境 --- 代理出错时使用
  // public domain: string = '/dev/'; // 正式环境
  public domain: string = 'http://appadmin.com/'; // 本地

  public aboutUs: string = this.domain+'index/about_us'; // 关于我们

  public login: string = this.domain+'login/login'; // 登陆
  public reg: string = this.domain+'login/reg'; // 注册

  public editNickname: string = this.domain+'user/edit_nickname'; // 修改用户信息
  public editPassword: string = this.domain+'user/edit_password'; // 修改密码
  public getWealth: string = this.domain+'user/get_wealth'; // 获取积分、余额 和现金的比例
  public wealth: string = this.domain+'user/wealth'; // 充值
  public getWealthList: string = this.domain+'user/get_wealth_list'; // 获取充值列表
  public applySetUpShop: string = this.domain+'user/apply_set_up_shop'; // 申请开店
  public getTranmoney: string = this.domain+'user/get_tranmoney'; // 获取用户资产变动记录

  public getStatus: string = this.domain+'shopping/get_status'; // 获取开店状态
  public shopping: string = this.domain+'shopping/index'; // 商城首页
  public shoppingInfo: string = this.domain+'shopping/info'; // 商城详情页
  
  constructor(
    public localstorage: LocalstorageService,
    public router: Router,
    public toast: ToastService,
  ) {}

  public setUserInfo(val){
    this.localstorage.setObject('userInfo', val);
    this.userInfo = val;
    this.update.next(this.userInfo);
  }

  
  public getUserInfo(){
    return this.localstorage.getObject('userInfo');
  }


  public logout(){
    this.localstorage.remove('userInfo');
    this.localstorage.remove('token');
    this.toast.presentToast('logout success');
    this.router.navigate(['/login']);
  }
}
