import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../service/alert.service';
import { ToastService } from '../../service/toast.service';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { ModalService } from '../../service/modal.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  public userInfo:any = {};
  public Data = [];
  public selectAddress = false; // 点击是否返回确认订单页面
  constructor(
    public modal: ModalService,
    public modalController: ModalController,
    public localstorage: LocalstorageService,
    public toast: ToastService,
    public http: HttpClient,
    public alert: AlertService,
    public route: ActivatedRoute,
    public common: CommonService,
  ) {
    this.userInfo = this.localstorage.getObject('userInfo');
      console.log(this.userInfo);
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });

      // 监听编辑地址页面传过来的值， 是否需要刷新数据
    this.common.get().subscribe((result) => {
      if(result.page === 'address' && result.data){
        this.getData();
      }
    })

    this.route.paramMap.subscribe(params => {
        if(params.get('page')){
          this.selectAddress = true;
        }
    });
   }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get(this.common.getAddressList,{params:{userid:this.userInfo.userid,mobile:this.userInfo.mobile}}).subscribe((res:any)=>{
      this.Data = res.data;
    })
  }

  newAddress(){
    this.modal.presentModal({type:'edit-address'});
  }

  editAddress(id){    
    console.log(id);
    this.modal.presentModal({type:'edit-address', id:id});
  }

  delete(id){
    this.alert.presentAlertConfirm({},{id:id},(res:any)=>{
      // 回调函数, 确认删除需要做的操作写到如下
      this.http.get(this.common.AddressDel,{params:{userid:this.userInfo.userid,mobile:this.userInfo.mobile,address_id:id}}).subscribe((res:any)=>{
        this.toast.presentToast(res.msg);
        // 删除成功才刷新页面数据
        if(res.status === 1){
          this.getData();  
        }        
      },(error:any)=>{
        this.toast.presentToast('网络错误,请重试');
      })
    });
  }

  cancel(){
    this.modalController.dismiss();
  }

  refreshBack(e){
    console.log(e);
  }

  // 从确认订单页面进入，重新选择收货地址
  onClick(address){
    if(this.selectAddress){
      this.common.send({page:'confirm-order',data:address});
      let back = document.getElementById('backButton');
      back.click();
    }
    
  }
}
