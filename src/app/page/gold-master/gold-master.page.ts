import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-gold-master',
  templateUrl: './gold-master.page.html',
  styleUrls: ['./gold-master.page.scss'],
})
export class GoldMasterPage implements OnInit {

  loginForm = this.formBuilder.group({

    'name': ['111111', [Validators.required, Validators.minLength(1)]],
    
    'tel': ['111111', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],

    'number': ['111111', [Validators.required, Validators.minLength(1)]]
    
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
