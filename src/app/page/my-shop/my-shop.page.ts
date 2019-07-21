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
  selector: 'app-my-shop',
  templateUrl: './my-shop.page.html',
  styleUrls: ['./my-shop.page.scss'],
})
export class MyShopPage implements OnInit {
  public userInfo:any = {};
  public Data:any = {};
  public showPage = true;

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
  }

  ngOnInit() {
    this.getData();
  }

  getData(){    
    this.http.get(this.common.getMyShop, { params: {userid:this.userInfo.userid, mobile:this.userInfo.mobile}}).subscribe((res:any) => {
      if(res.status !== 1){
        this.toast.presentToast(res.msg);
        let back = document.getElementById('backButton');
        back.click();
        return;
      }
      this.Data = res.data;
      this.showPage = this.Data.shopping.length > 0 ? true : false;
    }, error => {
      this.toast.presentToast('网络错误');
      console.log(error)
    })
  }

}
