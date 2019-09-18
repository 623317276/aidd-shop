import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';
import { CommonService } from '../../service/common.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';//引入

@Component({
  selector: 'app-my-lower',
  templateUrl: './my-lower.page.html',
  styleUrls: ['./my-lower.page.scss'],
})
export class MyLowerPage implements OnInit {

  public Data:any = {};
  public userInfo:any = {};
  constructor(
    public http: HttpClient,
    public toast: ToastService,
    public alert: AlertService,
    public router: Router,
    public common: CommonService,
    public loading: LoadingService,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { 
    this.userInfo = this.common.getUserInfo();
    this.Data.userid = this.userInfo.userid;
    this.Data.mobile = this.userInfo.mobile;
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
  }

  ngOnInit() {
    this.getData();
  }

  getData(){    
    this.loading.presentLoading();
    this.http.get(this.common.myLower,  { params:{userid:this.userInfo.userid, mobile:this.userInfo.mobile}}).subscribe((res:any) => {
      this.loading.cancel();
      this.Data = res.data;
      console.log(res);
      if(res.status !== 1){
        this.toast.presentToast(res.msg);
      }
    }, error => {
      this.loading.cancel();
      this.toast.presentToast('下拉刷新重试');
      console.log(error)
    })
  }

}
