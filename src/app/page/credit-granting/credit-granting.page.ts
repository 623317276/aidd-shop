import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-credit-granting',
  templateUrl: './credit-granting.page.html',
  styleUrls: ['./credit-granting.page.scss'],
})
export class CreditGrantingPage implements OnInit {

  loginForm = this.formBuilder.group({

    'combination': ['1', [Validators.required]],

    'name': ['111111', [Validators.required, Validators.minLength(1)]],
    
    'tel': ['18978429109', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],

    'leader_tel': ['18978429109', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],

    'agree': [false, [Validators.requiredTrue]],

    });

  constructor(
    public modalController: ModalController,
    public formBuilder:FormBuilder,
    public http:HttpService,
  ) { }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.http.post(''); 
  }

}
