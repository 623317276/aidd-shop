import { Injectable } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class CommonService {
  public userInfo: any = [];
  public domain: string = 'http://www.whatphp.com/';
  public domainImg: string = 'http://www.whatphp.com/Uploads/';
  constructor(
    public localstorage: LocalstorageService,
    public router: Router,
    public toast: ToastService,
  ) {}

  
  public logout(){
    this.localstorage.remove('userInfo');
    this.localstorage.remove('token');
    this.toast.presentToast('logout success');
    this.router.navigate(['/login']);
  }
}
