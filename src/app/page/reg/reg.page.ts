import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
  public regButton = false;
  public regData = {
      // mobile:'18978429109',
      // verify:'8888',
      // pmobile:'0',
      // loginPsw:'123123',
      // confirmLoginPsw:'123123',
      // payPsw:'123123',
      // confirmPayPsw:'123123',
      mobile:'',
      verify:'',
      pmobile:'0',
      loginPsw:'',
      confirmLoginPsw:'',
      payPsw:'',
      confirmPayPsw:'',
}
  constructor(
    public http: HttpClient,
    public common: CommonService,
    public toast: ToastService,
    public activatedRouter: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.regData.pmobile = this.activatedRouter.snapshot.paramMap.get('pmobile');
    console.log(this.regData.pmobile);
    if(!this.regData.pmobile){
        this.regData.pmobile = '0';
    }
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

  send(){
    if(!this.regData.mobile || this.regData.mobile.length != 11){
        this.toast.presentToast('手机号码错误');
        return false;
     }
    
     this.http.get(this.common.sendMsg, {params: {mobile: this.regData.mobile}}).subscribe((res:any)=>{
      if(res.status === 1){
        //每次点击时初始化
        this.verifyCode = {
          verifyCodeTips: "获取验证码",
          countdown: 60,//总共时间
          disable: true //禁止按钮被点击
        }
          this.settime();
      }
      this.toast.presentToast(res.msg);
      console.log(res);
    },error=>{
      this.verifyCode.disable = false;
      this.toast.presentToast('重试');
    });
  }

  //验证码倒计时 全局定义变量
  verifyCode: any ={
    verifyCodeTips: "获取验证码",
    countdown: 60,//总共时间
    disable: false
};
  settime() {
    if(this.verifyCode.countdown == 0) {
        this.verifyCode.verifyCodeTips = "获取验证码";
        this.verifyCode.disable = false;
        return;
    } else {
        this.verifyCode.countdown--;
    }
    setTimeout(() => {
        this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
        this.settime();
    }, 1000);
  }
}
