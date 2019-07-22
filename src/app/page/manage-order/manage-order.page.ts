import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../service/alert.service';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';
import { CommonService } from '../../service/common.service';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../../service/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';//引入

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.page.html',
  styleUrls: ['./manage-order.page.scss'],
})
export class ManageOrderPage implements OnInit {
  public Data:any = [];
  public userInfo:any = {};
  public hasMore = true;

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
    }

  ngOnInit() {
    this.getData(this.page);
  }



  getData(page = 1){
    let p = '' + page;
    this.loading.presentLoading();
    this.http.get(this.common.getMyShopOrderList, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile,page:p}}).subscribe((res:any) => {
      this.loading.cancel();
      if(res.status === 1){
        if(res.data.length < this.pageLimit){
          this.hasMore = false;
        }
      }
      if(page === 1){
        this.Data = res.data;
      }else{
        this.addItems(res.data);
      }
      
    }, error => {
      this.loading.cancel();
      this.toast.presentToast('网络错误');
      console.log(error)
    })
  }

  orderDetail(obj:any){
    this.router.navigate(['/order-detail']);
    this.common.order_detail = obj;
  }


  post(obj:any){
    this.alert.expressAlertPrompt({},{},(resp)=>{
      // 回调函数, 确认删除需要做的操作写到如下
        // console.log(resp);
        this.loading.presentLoading()
        this.http.get(this.common.postThing, {
          params: {
            userid    : this.userInfo.userid,
            mobile    : this.userInfo.mobile,
            order_no  : obj.order_no,
            kd_name   : resp.kd_name,
            kd_no     : resp.kd_no,
          }
        }).subscribe((res:any) => {
          this.loading.cancel();
          if(res.status === 1){
            this.getData(1);
          }
          this.toast.presentToast(res.msg);
        }, error => {
          this.loading.cancel();
          this.toast.presentToast('网络错误');
          console.log(error)
        })
    });
  }


  delete(id){
    this.alert.presentAlertConfirm({},{id:123},(res)=>{
      // 回调函数, 确认删除需要做的操作写到如下
      console.log(res);
    });
  }
  

   // 上下拉
   isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
   pageLimit = 20;
   public directionCount = 0;
   page = 1;
   state = {
     refreshState: {
       currentState: 'deactivate',
       drag: false,
     },
     direction: '', // 拉动方向，可以是 up 或 down
     endReachedRefresh: false, // 滚动到底自动刷新
     height: '100%',
   };
   dtPullToRefreshStyle = { height: this.state.height };
 
 
 
   pullToRefresh(event) {
      if (event === 'down') {
       // 下拉刷新进入
       this.hasMore = true;
       this.page = 1; // 页码数复位
       this.getData(this.page); // 重新请求数据
     } else {
       // 上拉加载更多进入
       if(!this.hasMore){
         // 判断没有更多的标识
         return ;
       }
       ++this.page;
       this.getData(this.page);
     }    
   }
 
   addItems(obj = []) {
     for (let i = 0; i < obj.length; i++) {
       this.Data.push(obj[i]);
     }
   }

}
