import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';
import { CommonService } from '../../service/common.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.page.html',
  styleUrls: ['./share-page.page.scss'],
})
export class SharePagePage implements OnInit {
  public Data = {
    id:'',
    mobile:''
  };

  constructor(
    public http: HttpClient,
    public toast: ToastService,
    public alert: AlertService,
    public router: Router,
    public common: CommonService,
    public loading: LoadingService,
    public route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.Data.id = params.get('id');      
      console.log(this.Data.id);
   });
  }

  onSubmit(){
    console.log(this.Data.mobile.length);
    if(!this.Data.id){
      this.toast.presentToast('参数错误');
      return false;
    }
    if(this.Data.mobile === ''){
        this.toast.presentToast('手机号码错误');
        return false;
    }
    this.loading.presentLoading();
    this.http.post(this.common.shareReceive, this.Data).subscribe((res:any)=>{
      if(res.status === 1){
        this.router.navigate(['tabs/tab1']);
      }
      this.loading.cancel();
      this.toast.presentToast(res.msg);
      console.log(res);
    },error => {
      this.loading.cancel();
      this.toast.presentToast('重试');
    });
  }
  
}
