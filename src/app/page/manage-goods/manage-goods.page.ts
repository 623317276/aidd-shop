import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../service/alert.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';//引入

@Component({
  selector: 'app-manage-goods',
  templateUrl: './manage-goods.page.html',
  styleUrls: ['./manage-goods.page.scss'],
})
export class ManageGoodsPage implements OnInit {
  public showPage = true;
  public userInfo:any = {};
  public Data:any = {};

  constructor(
    public http: HttpClient,
    public toast: ToastService,
    public alert: AlertService,
    public router: Router,
    public localstorage: LocalstorageService,
    public common: CommonService,
    public loading: LoadingService,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { 
    this.userInfo = this.localstorage.getObject('userInfo');
    this.common.update.subscribe((val)=>{
      this.userInfo = val;
    });

     // 监听编辑地址页面传过来的值， 是否需要刷新数据
     this.common.get().subscribe((result) => {
      if(result.page === 'manage-goods'){
        this.getData();
      }
    })
  }

  ngOnInit() {
    this.getData();
  }


  getData(){    
    this.http.get(this.common.getMyShop, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile}}).subscribe((res:any) => {
      this.Data = res.data;
      this.showPage = this.Data.shopping.length > 0 ? true : false;
    }, error => {
      this.toast.presentToast('网络错误');
      console.log(error)
    })
  }

  delete(id){
    this.alert.presentAlertConfirm({},{id:id},(res)=>{
      // 回调函数, 确认删除需要做的操作写到如下
      this.http.get(this.common.shoppingDel, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile, id:id}}).subscribe((res:any) => {
        if(res.status === 1){
          this.getData();
        }
        this.toast.presentToast(res.msg);
      }, error => {
        this.toast.presentToast('网络错误');
        console.log(error)
      })
    
    });
  }

}
