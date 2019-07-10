import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { HttpService } from '../../service/http.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-change-pay-psw',
  templateUrl: './change-pay-psw.page.html',
  styleUrls: ['./change-pay-psw.page.scss'],
})



export class ChangePayPswPage implements OnInit {
  @Input() type:string;
  loginForm = this.formBuilder.group({

    'oldPsw': ['111111', [Validators.required, Validators.minLength(6)]],
    
    'newPsw': ['111111', [Validators.required, Validators.minLength(6)]],

    'confirmNewPsw': ['111111', [Validators.required, Validators.minLength(6)]]
    
    });

  constructor(
    public modalController: ModalController,
    public modal: ModalService,
    public http: HttpService,
    public formBuilder:FormBuilder,
  ) { 
  }


  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  onSubmit(){
    let url = this.modal.type == 'pay' ? 'payUrl' : 'loginUrl'; // 取弹出窗口的类型来跑url
      console.log(this.loginForm.value);
      this.http.post(url);
  }
}
