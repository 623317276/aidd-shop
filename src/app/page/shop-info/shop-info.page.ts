import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.page.html',
  styleUrls: ['./shop-info.page.scss'],
})
export class ShopInfoPage implements OnInit {

  public refresh;

  constructor(
    public http: HttpClient,
  ) { }

  ngOnInit() {}

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    forkJoin(
      this.http.get('https://cnodejs.org/api/v1/topics', { responseType: 'json' }),
    ).subscribe(res => {
      // this.Data.banner = res.data.data.banner;
      // this.Data.news = res.data.data.news;
      if(this.refresh){
        this.refresh.target.complete();
      }
    }, error => {
      console.log(error)
    })
  }
  
  buy(){}
}
