import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../service/alert.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-goods',
  templateUrl: './manage-goods.page.html',
  styleUrls: ['./manage-goods.page.scss'],
})
export class ManageGoodsPage implements OnInit {
  public refresh;
  
  constructor(
    public http: HttpClient,
    public alert: AlertService,
  ) { }

  ngOnInit() {
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    forkJoin(
      this.http.get('https://cnodejs.org/api/v1/topics', { responseType: 'json' }),
    ).subscribe(res => {
      // this.Data.banner = res.data.data.banner;
      // this.Data.news = res.data.data.news;
      if(this.refresh){
        this.refresh.target.complete();
      }
    }, error => {
      console.log(error)
    })
  }

  delete(id){
    this.alert.presentAlertConfirm({},{id:123},(res)=>{
      // 回调函数, 确认删除需要做的操作写到如下
      console.log(res);
    });
  }

}
