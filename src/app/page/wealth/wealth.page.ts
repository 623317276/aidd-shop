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
  selector: 'app-wealth',
  templateUrl: './wealth.page.html',
  styleUrls: ['./wealth.page.scss'],
})
export class WealthPage implements OnInit {
  public refresh;
  public segment:string = 'balance'; // 用于控制选中
  public Data:any = {};
  public userInfo:any = {};
  public rate:any = {
    cash:1,
    integral:10,
  };
  public loginForm = this.formBuilder.group({
    'number': [0, [Validators.required]],
    
    });
    
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
      type: '',
      img:'',
      number: 0
    };
  }

  ngOnInit() {
    this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    this.http.get(this.common.getWealth).subscribe((res:any)=>{
      this.rate.cash = res.data.cash;
      this.rate.integral = res.data.integral;
      if(this.refresh){
        this.refresh.target.complete();
      }
    },error => {
      if(this.refresh){
        this.refresh.target.complete();
      }
      this.toast.presentToast('比例获取失败，下拉重新获取');
    });
  }

  onSubmit(type:string='balance'){
    if(this.Data.number === 0 || this.Data.number < 0){
        this.toast.presentToast('数量错误');
        return false;
    }
    if(!this.Data.img){
      this.toast.presentToast('请上传凭证');
        return false;
    }
    this.loading.presentLoading();
    this.Data.type = type;
    this.http.post(this.common.wealth, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        // 申请成功，数据复位
        this.files = [];
        this.Data.number = 0;
        // this.router.navigate(['']);
      }
      this.loading.cancel();
      this.toast.presentToast(res.msg);
      console.log(res);
    },error => {
      this.loading.cancel();
      this.toast.presentToast('重试');
    });
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    console.log(this.segment);

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
