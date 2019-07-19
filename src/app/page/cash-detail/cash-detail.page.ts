import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonService } from "../../service/common.service";
import { LocalstorageService } from '../../service/localstorage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cash-detail',
  templateUrl: './cash-detail.page.html',
  styleUrls: ['./cash-detail.page.scss'],
})
export class CashDetailPage implements OnInit {
  public userInfo:any = {};
  public title:string;
  public type:string;
  public refresh;
  public params:any;
  public Data:any = [];
  public load = true;
  public hidden = true;

  constructor(    
    private routerParams: ActivatedRoute,
    public common: CommonService,
    public localstorage: LocalstorageService,
    public toast: ToastService,
    public http: HttpClient,
  ) { 
    this.userInfo = this.localstorage.getObject('userInfo');
    this.common.update.subscribe((val)=>{
      this.userInfo = val;
    });
    
  }

  ngOnInit() {
    let type = this.routerParams.snapshot.paramMap.get('type');
    this.type = type;
    this.title = this.type == 'cash' ? '余额' : '积分';
    this.params = {
      userid: this.userInfo.userid,
      mobile: this.userInfo.mobile,
      type: this.type == 'cash' ? 1 : 2,
    };
    this.getData();
  }


  getData(){
    this.load = false;
    // type: 1现金2积分
    forkJoin(
      this.http.get(this.common.getTranmoney,{params : this.params}), // 获取数据
    ).subscribe((res:any)=>{
      this.Data = res[0].data;
      this.hidden = this.Data.length > 0 ? true : false;
      this.load = true;
    },error => {
      if(this.refresh){
        this.load = true;
        this.refresh.target.complete();
      }
      this.toast.presentToast('获取失败，下拉重新获取');
    });
  }



}
