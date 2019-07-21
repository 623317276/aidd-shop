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
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  public Data:any = {};
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
    this.getData();
  }

  getData(page = 1){
    let p = '' + page;
    this.loading.presentLoading()
    this.http.get(this.common.getOrderList, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile,page:p}}).subscribe((res:any) => {
      this.loading.cancel();
      if(res.status === 1){
        if(res.data.length < 20){
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
