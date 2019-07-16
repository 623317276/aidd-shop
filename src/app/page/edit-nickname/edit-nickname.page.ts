import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CommonService } from "../../service/common.service";
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastService } from '../../service/toast.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-edit-nickname',
  templateUrl: './edit-nickname.page.html',
  styleUrls: ['./edit-nickname.page.scss'],
})
export class EditNicknamePage implements OnInit {
  public userInfo:any = {};
  public editData:any = {};
  loginForm = this.formBuilder.group({

    'nickName': ['111111', [Validators.required]],
    
    });

  constructor(    
    public common: CommonService,
    public localstorage: LocalstorageService,
    public modalController: ModalController,
    public http: HttpClient,
    public toast: ToastService,
    public formBuilder:FormBuilder,
    public loading:LoadingService,
  ) { 
    this.userInfo = this.localstorage.getObject('userInfo');
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
      this.editData = {
        userid: this.userInfo.userid,
        mobile: this.userInfo.mobile,
        nickName: this.userInfo.account
      };
  }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  onSubmit(){
    this.loading.presentLoading();
    this.http.get(this.common.editNickname, {params: this.editData}).subscribe((res:any) => {
        
        if(res.status === 1){
          this.userInfo.account = this.editData.nickName;
            this.common.setUserInfo(this.userInfo);
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
