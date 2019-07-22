import { Injectable } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CommonService {
  public update:Subject<string> = new Subject<string>();
  public subject:Subject<string> = new Subject<string>(); // 用于页面间通讯使用
  public userInfo: any = [];
  
  public appDomain: string = 'http://app.whatphp.com/'; // 用于邀请页面使用
  public domain: string = 'http://www.whatphp.com/'; // 正式环境 --- 代理出错时使用
  // public domain: string = '/dev/'; // 正式环境
  // public domain: string = 'http://appadmin.com/'; // 本地

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
  public getAssets: string = this.domain+'user/get_assets'; // 获取用户资产---个人中心里刷新个人资产数据使用
  public getAddressList: string = this.domain+'user/address'; // 获取用户地址列表
  public AddressAdd: string = this.domain+'user/address_add'; // 添加收货地址
  public AddressUp: string = this.domain+'user/address_up'; // 编辑收货地址
  public AddressCount: string = this.domain+'user/address_cont'; // 收货地址详情
  public AddressDel: string = this.domain+'user/address_del'; // 删除收货地址
  public getDefalutAddress: string = this.domain+'user/get_defalut_address'; // 获取用户默认地址
  public getMyShop: string = this.domain+'user/get_my_shop'; // 获取我的店铺的详情
  public upShop: string = this.domain+'user/up_shop'; // 上传商品
  public getOrderList: string = this.domain+'user/get_order_list'; // 获取我购买订单的列表

  public getStatus: string = this.domain+'shopping/get_status'; // 获取开店状态
  public shopping: string = this.domain+'shopping/index'; // 商城首页
  public shoppingInfo: string = this.domain+'shopping/info'; // 商品详情页
  public shoppingBuy: string = this.domain+'shopping/buy'; // 确认订单->购买
  public shoppingDel: string = this.domain+'shopping/shopping_del'; // 删除我的商品
  public getMyShopOrderList: string = this.domain+'shopping/get_my_shop_order_list'; // 获取我的店铺的订单list
  public postThing: string = this.domain+'shopping/post_thing'; // 发货，填写订单快递信息
  
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

  send(message: any) {
    this.subject.next(message);
  }

  get(): Observable<any> {
      return this.subject.asObservable();
  }

  public order_detail = {}; // 用于订单list页面传递对象到订单详情页
  getOrderDetail(){
    return this.order_detail;
  }
}
