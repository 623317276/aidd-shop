import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastService } from '../../service/toast.service';
import { LoginguardService } from '../../service/loginguard.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public common: CommonService,
    public localstorage: LocalstorageService,
    public toast: ToastService,
    public router: Router,
    public loginguard: LoginguardService,
    ) { }

  ngOnInit() {}

   login(){
    this.localstorage.set('token', '1');
    this.toast.presentToast('login success');
    this.router.navigate(['']);
  }

  
}
