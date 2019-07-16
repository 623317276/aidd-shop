import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../../service/loading.service';
import { ToastService } from '../../service/toast.service';
import { CommonService } from "../../service/common.service";

@Component({
  selector: 'app-change-pay-psw',
  templateUrl: './change-pay-psw.page.html',
  styleUrls: ['./change-pay-psw.page.scss'],
})



export class ChangePayPswPage implements OnInit {
  @Input() type:string;
  public userInfo:any = {};
  public editData:any = {};
  loginForm = this.formBuilder.group({

    'oldPsw': ['111111', [Validators.required, Validators.minLength(6)]],
    
    'newPsw': ['111111', [Validators.required, Validators.minLength(6)]],

    'confirmNewPsw': ['111111', [Validators.required, Validators.minLength(6)]]
    
    });

  constructor(
    public modalController: ModalController,
    public modal: ModalService,
    public toast: ToastService,
    public http: HttpClient,
    public loading:LoadingService,
    public common: CommonService,
    public formBuilder:FormBuilder,
  ) { 
    this.userInfo = this.common.getUserInfo();
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
      this.editData = {
        userid: this.userInfo.userid,
        mobile: this.userInfo.mobile,
        type: this.modal.type,
        oldPsw: '',
        newPsw: '',
        confirmNewPsw: '',
      };
  }


  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  // 修改密码
  onSubmit(){
    // console.log(this.editData);return;
    this.loading.presentLoading();
    this.http.get(this.common.editPassword, {params: this.editData}).subscribe((res:any) => {
        if(res.status === 1){
            this.cancel();
        }
        this.loading.cancel();
        this.toast.presentToast(res.msg);
    },error => {
        this.loading.cancel();
        this.toast.presentToast(error);
    })
  }
  
}
