import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastService } from '../../service/toast.service';
import { CommonService } from '../../service/common.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-product-share-edit',
  templateUrl: './product-share-edit.page.html',
  styleUrls: ['./product-share-edit.page.scss'],
})
export class ProductShareEditPage implements OnInit {

  public Data:any = {};
  public userInfo:any = {};

  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    public common:CommonService,
    public toast:ToastService,
    public localstorage:LocalstorageService,
    public loading: LoadingService,
    public formBuilder:FormBuilder,
    ) { 
      this.userInfo = this.localstorage.getObject('userInfo');
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });

    }

  ngOnInit() {  
    
    this.Data = {
      userid: this.userInfo.userid,
      mobile: this.userInfo.mobile,
      id:'', // 分享id
      name:'',
      number:0,
      can_uid:'',
      already_uid:'',
    };

    this.route.queryParams.subscribe(params=> {
      this.Data.id = params.id;
      if(this.Data.id){
          this.getData();
      }
    })

  }

  getData(){
    this.loading.presentLoading();
    this.http.get(this.common.getMyShareInfo, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile,id:this.Data.id}}).subscribe((res:any) => {
      this.loading.cancel();
      if(res.status === 1){
        this.Data.name = res.data.name;
        this.Data.number = res.data.number;
        this.Data.can_uid = res.data.can_uid;
        this.Data.already_uid = res.data.already_uid;
      }
      
    }, error => {
      this.loading.cancel();
      this.toast.presentToast('网络错误,返回重试');
      console.log(error)
    })
  }

  onSubmit(){
    if(this.Data.name === ''){
        this.toast.presentToast('名称不可为空');
        return false;
    }
    if(this.Data.number === 0){
      this.toast.presentToast('数量不可为空');
      return false;
    }
    if(this.Data.can_uid === 0){
      this.toast.presentToast('领取用户不可为空');
      return false;
    }
    this.loading.presentLoading();
    this.http.post(this.common.myShareEdit, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        // 申请成功，数据复位
        this.ngOnInit();
        this.common.send({page:'product-share'});
        let back = document.getElementById('backButton');
        back.click();
      }
      this.loading.cancel();
      this.toast.presentToast(res.msg);
      console.log(res);
    },error => {
      this.loading.cancel();
      this.toast.presentToast('重试');
    });
  }


}
