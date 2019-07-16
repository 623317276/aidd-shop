import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
  public regButton = false;
  public regData = {
      mobile:'18978429109',
      verify:'8888',
      pmobile:'0',
      loginPsw:'123123',
      confirmLoginPsw:'123123',
      payPsw:'123123',
      confirmPayPsw:'123123',
}
  constructor(
    public http: HttpClient,
    public common: CommonService,
    public toast: ToastService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  reg(){
    if(!this.regData.mobile || this.regData.mobile.length != 11){
      this.toast.presentToast('手机号码错误');
      return false;
    }
    if(!this.regData.verify){
      this.toast.presentToast('请输入验证码');
      return false;
    }
    if(this.regData.loginPsw.length < 6 || this.regData.confirmLoginPsw.length < 6){
      this.toast.presentToast('登陆密码最少6位');
      return false;
    }
    if(this.regData.loginPsw !== this.regData.confirmLoginPsw){
      this.toast.presentToast('登陆密码与确认登陆密码不一致');
      return false;
    }
    if(this.regData.payPsw.length < 6 || this.regData.confirmPayPsw.length < 6){
      this.toast.presentToast('支付密码最少6位');
      return false;
    }
    if(this.regData.payPsw !== this.regData.confirmPayPsw){
      this.toast.presentToast('支付密码与确认支付密码不一致');
      return false;
    }
    this.regButton = true;
    this.http.get(this.common.reg, {params: this.regData}).subscribe((res:any)=>{
      this.regButton = false;
      this.toast.presentToast(res.msg);
      if(res.status === 1){
        this.router.navigate(['/login']);
      }
      console.log(res);
    },error=>{
      this.regButton = false;
      this.toast.presentToast('重试');
    });
  }

  
}
