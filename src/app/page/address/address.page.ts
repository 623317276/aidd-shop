import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../service/alert.service';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(
    public modal: ModalService,
    public modalController: ModalController,
    public alert: AlertService,
  ) { }

  ngOnInit() {
  }

  newAddress(){
    this.modal.presentModal({type:'edit-address'});
  }
  editAddress(id){    
    this.modal.presentModal({type:'edit-address', id:id});
  }
  delete(id){
    this.alert.presentAlertConfirm({},{id:123},(res)=>{
      // 回调函数, 确认删除需要做的操作写到如下
      console.log(res);
    });
  }
  cancel(){
    this.modalController.dismiss();
  }
}
