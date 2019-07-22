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
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  public Data:any = {};


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
    this.Data = this.common.order_detail;
  }

  ngOnInit() {
    this.checkData();
  }

  checkData(){
    if(!this.Data){
      let back = document.getElementById('backButton');
      back.click();
      this.toast.presentToast('数据缺失，请重试');
    }
  }
}
