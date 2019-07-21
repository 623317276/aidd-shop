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
  selector: 'app-manage-edit-goods',
  templateUrl: './manage-edit-goods.page.html',
  styleUrls: ['./manage-edit-goods.page.scss'],
})
export class ManageEditGoodsPage implements OnInit {

  public id:string = ''; // 商品id
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
      name:'',
      stock:0,
      price:0,
      fictitious:'1',  // 1实物2虚拟
      mode:'1', // 購買方式1现金2积分
      content:'',
      img:'',
    };

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  onSubmit(){
    // console.log(this.Data);return;
    if(this.Data.name === ''){
        this.toast.presentToast('商品名称不可为空');
        return false;
    }
    if(this.Data.stock === 0){
      this.toast.presentToast('库存不可为空');
      return false;
    }
    if(this.Data.price === 0){
      this.toast.presentToast('价格不可为空');
      return false;
    }
    if(!this.Data.img){
      this.toast.presentToast('请上传凭证');
        return false;
    }
    this.loading.presentLoading();
    this.http.post(this.common.upShop, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        // 申请成功，数据复位
        this.files = [];
        this.ngOnInit();
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
