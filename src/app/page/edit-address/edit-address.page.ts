import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  public userInfo:any = {};
  public url = '';
  public Data:any = {
    userid : '',
    mobile : '',
    address_id : '',
    name : '',
    telephone : '',
    address : '',
    is_default : true,
  };
  @Input() data:any; 

  constructor(
    public modalController: ModalController,
    public localstorage: LocalstorageService,
    public toast: ToastService,
    public loading: LoadingService,
    public http: HttpClient,
    public common: CommonService,

  ) { 
    this.userInfo = this.localstorage.getObject('userInfo');
      console.log(this.userInfo);
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
  }

 

  ngOnInit() {
    if(this.data.id){
      this.url = this.common.AddressUp;
      this.getData();
    }else{
      this.url = this.common.AddressAdd;
    }
  }

  getData(){
    this.loading.presentLoading();
    this.http.get(this.common.AddressCount,{params:{userid:this.userInfo.userid,mobile:this.userInfo.mobile,address_id:this.data.id}}).subscribe((res:any)=>{
      this.loading.cancel();
      this.Data.name = res.data.name;
      this.Data.address = res.data.address;
      this.Data.telephone = res.data.telephone;
      this.Data.address_id = res.data.address_id;
      this.Data.is_default = res.data.zt_ === '1' ? true : false;
    },error=>{
      this.loading.cancel();
    })
  }

  submit(){
    this.loading.presentLoading();
    this.Data.userid = this.userInfo.userid;
    this.Data.mobile = this.userInfo.mobile;
    this.http.get(this.url,{params:this.Data}).subscribe((res:any)=>{
      this.loading.cancel();
      if(res.status === 1){
        this.cancel();
        this.common.send({page:'address',data:true}); // 告诉收货列表页需要刷新数据
      }
      this.toast.presentToast(res.msg);
      console.log(res);
    },error=>{
      this.loading.cancel();
    })
  }


  cancel(){
    this.modalController.dismiss();
  }
}
