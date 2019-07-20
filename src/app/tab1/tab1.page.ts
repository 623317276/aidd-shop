import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      console.log(this.userInfo);
      this.common.update.subscribe((val)=>{
        this.userInfo = val;
      });
  }

  ngOnInit() {    
    this.getShopList('1');
    this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getShopList(item:string='1',page:string='1'){
    this.http.get(this.common.shopping,{params: {type:item,page:page}}).subscribe((res:any) => {
      this.Data['shop'] = res.data.view;
      console.log(this.Data);
    }, error => {
      console.log(error)
    })
  }

  getData(){
    this.http.get(this.common.domain).subscribe(res=>{
      this.Data.banner = res['data'].data.banner;
      this.Data.news = res['data'].data.news;
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
