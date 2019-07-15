import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { HttpClient } from '@angular/common/http';

import { ModalService } from '../service/modal.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public userInfo:any = {};
  public Data:any = [];
  public refresh;
  constructor(
    public common: CommonService,
    public localstorage: LocalstorageService,
    public toast: ToastService,
    public http: HttpClient,
    public modal: ModalService,
    ) {
      this.userInfo = this.localstorage.getObject('userInfo');
  }

  // public head;
  ngOnInit() {

  //   this.head =  {
  //     header: new HttpHeaders({
  //     'Content-Type' : 'application/json'
  //     // 'Content-Type' : 'application/x-www-form-urlencoded'
  //   })
  // };
  //   this.http.post('http://localhost/app-admin/index/uploadimg',{
  //     type: 123
  //   }, this.head).subscribe((res)=>{
  //     console.log(res)
  //   },error=>{
  //     console.log(error)
  //   })
    this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    this.http.get(this.common.domain).subscribe(res=>{
      this.Data.banner = res['data'].banner;
      this.Data.news = res['data'].news;
      if(this.refresh){
          this.refresh.target.complete();
        }
    })
    // forkJoin(
    //   this.http.get(this.common.domain),
    // ).subscribe((res) => {
    //   console.log(res);return;
    //   // this.Data.banner = res.data.banner;
    //   // this.Data.news = res.data.news;
    //   if(this.refresh){
    //     this.refresh.target.complete();
    //   }
    // }, error => {
    //   console.log(error)
    // })
  }
  

  showNew(index:any){
    let data = [];
    data['type'] = 'news';
    data['data'] = this.Data.news[index];
    this.modal.presentModal(data);
  }

  gomodal(type:string=''){
    this.modal.presentModal({type:type});
}

  logout(){
    this.localstorage.remove('userInfo');
    this.toast.presentToast('logout success');
  }
  
}
