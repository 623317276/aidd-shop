import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})

// 登陆页面跳转
export class LoginguardService implements CanActivate {

  public userInfo: any = [];
  public token: string = '';
  constructor(
    public router:Router,
    public local:LocalstorageService,
    public toast: ToastService,
  ) { }

  canActivate(){
    this.userInfo = this.local.get('userInfo');
      if(!this.userInfo){
          this.toast.presentToast('请先登录');
          this.router.navigate(['/login'] )
          return false;
      }
      return true;
  }
}

@Injectable({
  providedIn: 'root'
})
// 未登陆页面跳转
export class UnloginguardService  implements CanActivate {
  public userInfo: any = [];
  public token: any = [];
  
  constructor(
    public router:Router,
    public local:LocalstorageService,
    public toast: ToastService,
    ) { }

  canActivate(){
    this.userInfo = this.local.get('userInfo');
      if(this.userInfo){
        this.toast.presentToast('退出才能到登陆界面');
          this.router.navigate(['/'] )
          return false;
      }
      return true;
  }
}