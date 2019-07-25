import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../service/loading.service';
import { AlertService } from '../../service/alert.service';
import { ToastService } from '../../service/toast.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { CommonService } from '../../service/common.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { elementStart } from '@angular/core/src/render3';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.page.html',
  styleUrls: ['./confirm-order.page.scss'],
})
export class ConfirmOrderPage implements OnInit {
  public noAddress = false;
  public userInfo:any = {};
  public shopData:any = {};
  public DefaultAddress:any = {
    name:'',
    telephone:'',
    address:'',
  };
  public Data:any = {
    userid: '',
    mobile: '',
    id : '',
    num : 1,
    remark : '',
    payPsw:'',
    address_id:0,
    agree: false
  };


  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    public localstorage: LocalstorageService,
    public alert: AlertService,
    public router: Router,
    public toast: ToastService,
    public common: CommonService,
    public loading: LoadingService,

  ) {
    this.userInfo = this.common.getUserInfo();
    this.Data.userid = this.userInfo.userid;
    this.Data.mobile = this.userInfo.mobile;
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });

    this.route.paramMap.subscribe(params => {
        this.Data.id = params.get('shoppingId');
    });

    // 监听选择地址页面传回来的地址id
    this.common.get().subscribe((result) => {
      if(result.page === 'confirm-order'){
        this.DefaultAddress = result.data;
        this.noAddress = false;
        this.Data.address_id = this.DefaultAddress.address_id;
      }
    })
}

  ngOnInit() {
    this.getShopInfo();
  }

  buy(){
    if(!this.Data.agree){
      this.toast.presentToast('请同意合同协议');
      return ;
    }
      this.alert.presentAlertPrompt({},{},(res)=>{
      this.Data.payPsw = res.psw;
      this.loading.presentLoading();
      this.http.get(this.common.shoppingBuy, {params: this.Data}).subscribe((res:any) => {
        this.loading.cancel();
        if(res.status === 1){
          if(this.shopData.mode === '1'){
            this.userInfo.cash = parseFloat(this.userInfo.cash) - parseFloat(res.data);
          }else{
            this.userInfo.integral = parseFloat(this.userInfo.integral) - parseFloat(res.data);
          }
          this.common.setUserInfo(this.userInfo);
          this.router.navigate(['/order-list']);
        }
        this.toast.presentToast(res.msg);
      }, error => {
        this.loading.cancel();
        this.toast.presentToast('购买失败，请重试');
      })
      console.log(res);
    });
    
  }

  showContract(id){
    if(this.Data.agree){
      this.router.navigate(['/textarea'],{ queryParams: { type: 'contract', id: id } });
    }
  }

  // 首次进入， 获取商品信息做页面显示
  getShopInfo(){
    this.loading.presentLoading();
    forkJoin(
      this.http.get(this.common.shoppingInfo, { params:{id:this.Data.id}}),
      this.http.get(this.common.getDefalutAddress, { params:{userid:this.userInfo.userid, mobile:this.userInfo.mobile}}),
    ).subscribe((res:any)=>{
      this.loading.cancel();
      this.shopData = res[0].data;
      if(this.shopData.type !== '1'){
        this.Data.agree = true;
      }
      if(res[1].data){
        this.DefaultAddress = res[1].data;
        this.Data.address_id = res[1].data.address_id;
      }else{
        this.noAddress = true;
      }
      
    },error=>{
      this.loading.cancel();
    })
  }


  addShop(add){
    if(add){
      ++this.Data.num;
    }else{
      if(this.Data.num === 1){
        return;
      }
      --this.Data.num;
    }
  }

  selectAddress(){
    // this.common.send({page:'selectAddress'});
    this.router.navigate(['/address',{"page":'selectAddress'}]);
  }
}
