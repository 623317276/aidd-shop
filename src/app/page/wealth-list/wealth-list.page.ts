import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-wealth-list',
  templateUrl: './wealth-list.page.html',
  styleUrls: ['./wealth-list.page.scss'],
})
export class WealthListPage implements OnInit {
  public segment:string = 'balance'; // 用于控制选中
  public refresh;

  constructor(
    public http: HttpClient,
    public toast:ToastService,
    public common:CommonService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    this.http.get(this.common.getWealthList).subscribe((res:any)=>{
      
      if(this.refresh){
        this.refresh.target.complete();
      }
    },error => {
      if(this.refresh){
        this.refresh.target.complete();
      }
      this.toast.presentToast('获取失败，下拉重新获取');
    });
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.segment = ev.detail.value;
    console.log(this.segment);

  }
}
