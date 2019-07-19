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
  public flag = true;
  public index = 0;
  public refresh;
  public Data:any = {};
  
  constructor(
    public loading: LoadingService,
    public common: CommonService,
    public http: HttpClient,
    ) {
      this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    this.loading.presentLoading();
    this.http.get(this.common.domain).subscribe((res:any) => {
      this.loading.cancel();
      this.Data.banner = res['data'].data.banner;
      this.Data.news = res['data'].data.news;
      if(this.refresh){
        this.refresh.target.complete();
      }
    }, error => {
      this.loading.cancel();
      console.log(error)
    })
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
      let key = 'titleTemplate' + item;
      this.Data[key] = res.data.view;
      console.log(this.Data);
    }, error => {
      console.log(error)
    })
  }
}
