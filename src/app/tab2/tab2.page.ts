import { Component } from '@angular/core';
import { CommonService } from "../service/common.service";
import { LoadingService } from "../service/loading.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public index = 0;
  public Data = {};
  
  constructor(
    public loading: LoadingService,
    public common: CommonService,
    public http: HttpClient,
    ) {
      this.getData();
  }
  
  getData(){
    this.Data = {
      titleTemplate1:[],
      hasMore1:true,
      titleTemplate2:[],
      hasMore2:true,
      titleTemplate3:[],
      hasMore3:true,
    };
    // 获取3个区的商品
    this.getShopList('1');
    this.getShopList('2');
    this.getShopList('3');
  }

  onChange(item) {
    console.log('onChange', item);
  }
  onTabClick(item) {
    console.log('onTabClick', item);
  }
  selectCard(e) {
    console.log(' ', JSON.stringify(e));
  }
  changeIndex() {
    this.index = 0;
  }


  getShopList(item:string='1',page:string='1'){
    this.http.get(this.common.shopping,{params: {type:item,page:page}}).subscribe((res:any) => {
      let index = 'titleTemplate'+item;
      let has = 'hasMore'+item;
      if(res.data.view.length < 2){
        this.Data[has] = false; // 没有更多数据的标记
      }     
      this.addItems(index, res.data.view);
    }, error => {
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
    let has = 'hasMore'+(this.index + 1);
     if (event === 'down') {
      // 下拉刷新进入
      this.Data[has] = true;
      this.page = 1; // 页码数复位
      this.getData(); // 重新请求数据
    } else {
      // 上拉加载更多进入
      if(!this.Data[has]){
        // 判断没有更多的标识
        return ;
      }
      let page = '' + ++this.page;
      let type = '' + (this.index + 1);
      this.getShopList(type, page);
    }    
  }

  addItems(item = '', obj = []) {
    for (let i = 0; i < obj.length; i++) {
      this.Data[item].push(obj[i]);
    }
  }

}
