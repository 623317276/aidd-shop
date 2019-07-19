import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { LoadingService } from '../../service/loading.service';
import { ToastService } from '../../service/toast.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-set-up-shop',
  templateUrl: './set-up-shop.page.html',
  styleUrls: ['./set-up-shop.page.scss'],
})

export class SetUpShopPage implements OnInit {

  // @Input() type:string;
  public Data:any = {};
  public userInfo:any;
  public loginForm = this.formBuilder.group({

    'name': ['', [Validators.required]],
    
    'idCardNumber': ['', [Validators.required]],

    'tel': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],

    'agree': [false, [Validators.requiredTrue]],
    
    });

  constructor(
    public modalController: ModalController,
    public common:CommonService,
    public formBuilder:FormBuilder,
    public localstorage:LocalstorageService,
    public toast:ToastService,
    public loading:LoadingService,
    public http: HttpClient,
    public router: Router,
    public alertCtrl: ModalController
    ) { 
      this.userInfo = this.localstorage.getObject('userInfo');
    this.common.update.subscribe((val)=>{
      this.userInfo = val;
    });
    this.Data = {
      userid: this.userInfo.userid,
      mobile: this.userInfo.mobile,
      name: '姓名', // 姓名
      tel: '18877777777', // 手机号码
      img1:'', // 正面
      img2:'', // 反面
      idCardNumber: '444444000011112222' // 号码
    };
    }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  onSubmit(){
    if(!this.Data.img1){
      this.toast.presentToast('请上传身份证正面');
      return ;
    }
    if(!this.Data.img2){
      this.toast.presentToast('请上传身份证反面');
      return ;
    }

    this.loading.presentLoading();

    this.http.post(this.common.applySetUpShop, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        // 广播 用户开店信息变化
        this.userInfo.is_dailishang = 1;
        this.common.setUserInfo(this.userInfo);
      }
      this.loading.cancel();
      this.toast.presentToast(res.msg);
    },error=>{
      this.loading.cancel();
      this.toast.presentToast('重试');
    })

  }

  public getStatus(){
    this.loading.presentLoading();
    this.http.post(this.common.getStatus, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        // 开店申请通过,广播用户信息改变
        this.userInfo.is_dailishang = res.data;
        this.common.setUserInfo(this.userInfo);
        if(res.data === 2){
          this.cancel();
          this.router.navigate(['/my-shop']);
        }        
      }
      this.loading.cancel();
      this.toast.presentToast(res.msg);
      console.log(res);
    },error => {
      this.loading.cancel();
      this.toast.presentToast('重试');
    });
  }


  // 正面上传图片的操作
  public files = [
            // {
            //   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg' // 正面
            // },
            // {
            //   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg' // 反面
            // }
          ];
  public multiple = false;
  public multipleTab = 0;
  changeMultiple(value: number) {
    this.multipleTab = value;
  }
  fileChange(params) {
    console.log(params);
    const { files, type, index } = params;
    this.files = files;
    // console.log(this.files);return;
    if(this.files[0]){
      this.Data.img1 = this.files[0].url;
    }
    if(this.files[1]){
      this.Data.img2 = this.files[1].url;
    }
  }
  imageClick(params) {
    console.log(params);
  }

}
