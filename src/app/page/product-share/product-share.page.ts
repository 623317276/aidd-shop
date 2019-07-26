import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../service/alert.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-share',
  templateUrl: './product-share.page.html',
  styleUrls: ['./product-share.page.scss'],
})
export class ProductSharePage implements OnInit {
  public showPage = true;
  public userInfo:any = {};
  public Data:any = [];

  constructor(
    public http: HttpClient,
    public toast: ToastService,
    public alert: AlertService,
    public router: Router,
    public localstorage: LocalstorageService,
    public common: CommonService,
    public loading: LoadingService,
    public route: ActivatedRoute,
    ) { 
      this.userInfo = this.localstorage.getObject('userInfo');
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });

      // 监听编辑地址页面传过来的值， 是否需要刷新数据
      this.common.get().subscribe((result) => {
        if(result.page === 'product-share'){
          console.log(result);
          this.getData();
        }
      })

    }

 ngOnInit() {
    this.getData();
  }


  getData(){
    this.http.get(this.common.getMyShareList, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile}}).subscribe((res:any) => {
      this.Data = res.data;
      this.showPage = this.Data.length > 0 ? true : false;
    }, error => {
      this.toast.presentToast('网络错误');
      console.log(error)
    })
  }

  delete(id){
    this.alert.presentAlertConfirm({},{id:id},(res)=>{
      this.loading.presentLoading();
      // 回调函数, 确认删除需要做的操作写到如下
      this.http.get(this.common.myShareDelete, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile, id:id}}).subscribe((res:any) => {
        this.loading.cancel();
        if(res.status === 1){
          this.getData();
        }
        this.toast.presentToast(res.msg);
      }, error => {
        this.loading.cancel();
        this.toast.presentToast('网络错误');
        console.log(error)
      })
    
    });
  }


}
