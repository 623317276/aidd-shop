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
  selector: 'app-shop-info',
  templateUrl: './shop-info.page.html',
  styleUrls: ['./shop-info.page.scss'],
})
export class ShopInfoPage implements OnInit {

  public refresh;
  public Data:any = {};
  public id;
  public showPage = true;
  constructor(
    public http: HttpClient,
    public toast: ToastService,
    public alert: AlertService,
    public router: Router,
    public common: CommonService,
    public loading: LoadingService,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.id = params.get('id');
       this.getData();
    });
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){    
    this.showPage = true;
    // this.loading.presentLoading();
    this.http.get(this.common.shoppingInfo, { params: {id:this.id}}).subscribe((res:any) => {
      // this.loading.cancel();
      this.showPage = false;
      this.Data = res.data;
      console.log(res);
      if(res.status !== 1){
        this.toast.presentToast(res.msg);
      }
      if(this.refresh){
        this.refresh.target.complete();
      }
    }, error => {
      // this.loading.cancel();
      this.toast.presentToast('下拉刷新重试');
      console.log(error)
    })
  }
  
  buy(){
    this.router.navigate(['/confirm-order',{"shoppingId":this.Data.id}]);
    // this.alert.presentAlertPrompt({},{},(res)=>{
    //   let psw = res.psw;
    //   this.http.post('',{
    //     psw : psw,
    //     id : this.id
    //   });
    //   console.log(res);
    // });
  }

  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
}
