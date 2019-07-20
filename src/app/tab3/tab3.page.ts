import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from "../service/common.service";
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { ModalService } from '../service/modal.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';//引入

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public Data:any = {
    aboutUs:'',
    rule:''
  };
  public userInfo:any = {};
  public segment:string = 'person'; // 用于控制选中
  public refresh;

  constructor(
    public common: CommonService,
    public localstorage: LocalstorageService,
    public router: Router,
    public toast: ToastService,
    public http: HttpClient,
    public modal: ModalService,
    public sanitizer: DomSanitizer,
    ) {
      this.userInfo = this.localstorage.getObject('userInfo');
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });

      this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.segment = ev.detail.value;
    console.log(this.segment);

  }

  getData(){
    this.http.get(this.common.getAssets,{params:{userid:this.userInfo.userid,mobile:this.userInfo.mobile}}).subscribe((res:any) => {
      if(res.status === 1){
        this.userInfo.cash = res.data.cangku_num;
        this.userInfo.integral = res.data.fengmi_num;
      }
      
      if(this.refresh){
        this.refresh.target.complete();
      }
    }, error => {
      console.log(error)
    })
  }

  changePws(type:string='pay'){
      this.modal.presentModal({type:type});
  }

  logout(){
      this.common.logout();
  }
  
}
