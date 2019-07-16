import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastService } from '../../service/toast.service';
import { LoginguardService } from '../../service/loginguard.service';
import { LoadingService } from '../../service/loading.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginData = {
    'mobile' : '18978429109',
    'password' : '123123',
  };
  public loginButton = false;
  constructor(
    public common: CommonService,
    public localstorage: LocalstorageService,
    public loading: LoadingService,
    public toast: ToastService,
    public router: Router,
    public http: HttpClient,
    public loginguard: LoginguardService,
    ) { }

  ngOnInit() {}

   login(){
    this.loginButton = true;
    this.http.get(this.common.login, {params: this.loginData}).subscribe((res:any)=>{
      this.loginButton = false;
      if(res.status === 1){
        this.localstorage.setObject('userInfo', res.data);
        this.common.setUserInfo(res.data);
        this.toast.presentToast('登陆成功');
        this.router.navigate(['']);
        return ;
      }
      this.toast.presentToast('账号密码错误');
      console.log(res);
    },error => {
      this.loginButton = false;
      this.toast.presentToast('重试');
    });
     
  }

  
}
