import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-cash-detail',
  templateUrl: './cash-detail.page.html',
  styleUrls: ['./cash-detail.page.scss'],
})
export class CashDetailPage implements OnInit {
  public title:string;
  public type:string;
  public refresh;
  constructor(    
    private routerParams: ActivatedRoute,
    public toast: ToastService,
    public http: HttpClient,
  ) { 

  }

  ngOnInit() {
    let type = this.routerParams.snapshot.paramMap.get('type');
    this.type = type;
    this.title = this.type == 'cash' ? '余额' : '积分';
    this.getData();
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
      forkJoin(
        // this.http.post();
        
      ).subscribe(res => {

        if(this.refresh){
          this.refresh.target.complete();
        }
      }, error=>{

      })
  }
}
