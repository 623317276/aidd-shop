import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-nickname',
  templateUrl: './edit-nickname.page.html',
  styleUrls: ['./edit-nickname.page.scss'],
})
export class EditNicknamePage implements OnInit {

  loginForm = this.formBuilder.group({

    'nickName': ['111111', [Validators.required]],
    
    });

  constructor(    
    public modalController: ModalController,
    public http: HttpClient,
    public formBuilder:FormBuilder,
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  onSubmit(){
    console.log(this.loginForm.value);
    forkJoin(
    this.http.post('',[]),
    ).subscribe(res => {

    },error => {

    })
  }

}
