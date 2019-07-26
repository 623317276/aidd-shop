import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastService } from '../../service/toast.service';
import { CommonService } from '../../service/common.service';
import { LoadingService } from '../../service/loading.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  public Data:any = {};
  public userInfo:any = {};
    
  constructor(
    public http: HttpClient,
    public common:CommonService,
    public toast:ToastService,
    public localstorage:LocalstorageService,
    public router: Router,
    public loading: LoadingService,
    public formBuilder:FormBuilder,
    ) {
      this.userInfo = this.localstorage.getObject('userInfo');
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
      this.Data = {
        userid: this.userInfo.userid,
        mobile: this.userInfo.mobile,
        img:'',
        number: 0
      };
    }

  ngOnInit() {
  }

  onSubmit(){
    if(this.Data.number === 0 || this.Data.number < 0){
        this.toast.presentToast('数量错误');
        return false;
    }
    if(!this.Data.img){
      this.toast.presentToast('请上传凭证');
        return false;
    }
    this.loading.presentLoading();
    this.http.post(this.common.refuelingExchange, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        // 申请成功，数据复位
        this.files = [];
        this.Data.number = 0;
      }
      this.loading.cancel();
      this.toast.presentToast(res.msg);
      console.log(res);
    },error => {
      this.loading.cancel();
      this.toast.presentToast('重试');
    });
  }
  
  // 上传图片的操作
  public files = [];
  public multiple = false;
  public multipleTab = 0;
  changeMultiple(value: number) {
  this.multipleTab = value;
  }
  fileChange(params) {
  console.log(params);
  const { files, type, index } = params;
  this.files = files;
  this.Data.img = this.files[0].url;
  }
  imageClick(params) {
  console.log(params);
  }

}
