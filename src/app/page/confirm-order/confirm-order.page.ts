import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.page.html',
  styleUrls: ['./confirm-order.page.scss'],
})
export class ConfirmOrderPage implements OnInit {
  shoppingId:string;
  constructor(
    public route: ActivatedRoute,

  ) { 
    this.route.paramMap.subscribe(params => {
        this.shoppingId = params.get('shoppingId');
        // this.getData();
    });
}

  ngOnInit() {
  }

  // getData(){    
  //   this.showPage = true;
  //   this.loading.presentLoading();
  //   this.http.get(this.common.shoppingInfo, { params: {id:this.id}}).subscribe((res:any) => {
  //     this.loading.cancel();
  //     this.showPage = false;
  //     this.Data = res.data;
  //     console.log(res);
  //     if(res.status !== 1){
  //       this.toast.presentToast(res.msg);
  //     }
  //     if(this.refresh){
  //       this.refresh.target.complete();
  //     }
  //   }, error => {
  //     this.loading.cancel();
  //     this.toast.presentToast('下拉刷新重试');
  //     console.log(error)
  //   })
  // }

}
