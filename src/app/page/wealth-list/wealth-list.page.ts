import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { ToastService } from '../../service/toast.service';
import { forkJoin } from 'rxjs';
import { AngularDelegate } from '@ionic/angular';

@Component({
  selector: 'app-wealth-list',
  templateUrl: './wealth-list.page.html',
  styleUrls: ['./wealth-list.page.scss'],
})
export class WealthListPage implements OnInit {
  public segment:string = 'balance'; // 用于控制选中
  public refresh;
  public params1:any;
  public params2:any;
  public Data = {
    cash : [],
    integral : [],
  };
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
      this.params1 = {
        userid: this.userInfo.userid,
        mobile: this.userInfo.mobile,
        type: 1,
      };
      this.params2 = {
        userid: this.userInfo.userid,
        mobile: this.userInfo.mobile,
        type: 2,
      };
  }

  ngOnInit() {
    this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    // type: 1现金2积分
    forkJoin(
      this.http.get(this.common.getWealthList,{params : this.params1}), // 余额数据
      this.http.get(this.common.getWealthList,{params : this.params2}), // 积分数据
    ).subscribe((res:any)=>{
      this.Data.cash = res[0].data;
      this.Data.integral = res[1].data;
      if(this.refresh){
        this.refresh.target.complete();
      }
    },error => {
      if(this.refresh){
        this.refresh.target.complete();
      }
      this.toast.presentToast('获取失败，下拉重新获取');
    });
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.segment = ev.detail.value;
    console.log(this.segment);

  }
}
