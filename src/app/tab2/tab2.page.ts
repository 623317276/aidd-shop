import { Component } from '@angular/core';
import { CommonService } from "../service/common.service";
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public flag = true;
  public index = 0;
  public refresh;

  constructor(
    public common: CommonService,
    public http: HttpClient,
    ) {
  }

  doRefresh(event){
    this.refresh = event;
    this.getData();  
  }

  getData(){
    forkJoin(
      // this.http.get('https://cnodejs.org/api/v1/topics', { responseType: 'json' }),
    ).subscribe(res => {
      if(this.refresh){
        this.refresh.target.complete();
      }
    }, error => {
      console.log(error)
    })
  }

  onChange(item) {
    console.log('onChange', item);
  }
  onTabClick(item) {
    console.log('onTabClick', item);
  }
  selectCard(e) {
    console.log(' ', JSON.stringify(e));
  }
  changeIndex() {
    this.index = 0;
  }

}
