import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.page.html',
  styleUrls: ['./share-list.page.scss'],
})
export class ShareListPage implements OnInit {
  public index = 0;
  public Data = {
      titleTemplate:[],
      hasMore:true,
  };
  public load = true;
  public cashHidden = true;
  public userInfo:any = {};

  constructor(
    public http: HttpClient,
    public toast:ToastService,
    public common:CommonService,
    ) { 
      this.userInfo = this.common.getUserInfo();
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
    }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.Data = {
      hasMore:true,
      titleTemplate:[],
    };
    // 获取记录
    this.getShopList();
  }

  getShopList(page:string='1'){
    this.load = false;
    this.http.get(this.common.getRefuelingExchangeList,{params: {userid:this.userInfo.userid,mobile:this.userInfo.mobile,page:page}}).subscribe((res:any) => {
      this.load = true;
      this.cashHidden = res.data.length > 0 ? true : false;
      if(res.data.length < 20){
        this.Data.hasMore = false; // 没有更多数据的标记
      }     
      this.addItems(res.data);
    }, error => {
      this.load = true;
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
      this.Data.hasMore = true;
      this.page = 1; // 页码数复位
      this.getData(); // 重新请求数据
    } else {
      // 上拉加载更多进入
      if(!this.Data.hasMore){
        // 判断没有更多的标识
        return ;
      }
      let page = '' + ++this.page;
      let type = '' + (this.index + 1);
      this.getShopList(page);
    }    
  }

  addItems(obj = []) {
    for (let i = 0; i < obj.length; i++) {
      this.Data.titleTemplate.push(obj[i]);
    }
  }
}
