import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from "../../service/common.service";
import { LoadingService } from "../../service/loading.service";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';//引入

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.page.html',
  styleUrls: ['./textarea.page.scss'],
})
export class TextareaPage implements OnInit {
  public type:string = '';
  public title:string = '';
  public Data:any;
  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    public common: CommonService,
    public loading: LoadingService,
    public sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    let data = {};
    this.route.queryParams
      .subscribe((params) => {
        data = params;
        this.type = params.type;
        switch (this.type) {
          case 'aboutUs':
            this.title = '关于我们';
            this.getData();
            break;  
          case 'rule':
            this.title = '规则';
            this.getData();
            break;      
          case 'contract':
            this.title = '电子合同';
            this.getData(data);
            break;   
          case 'customer':
              this.title = '客服';
              this.getData(data);
              break;   
          default:
            break;
        }
      })
      
      
  }

  getData(para:any = {type:this.type}){
    this.loading.presentLoading();
    this.http.get(this.common.aboutUs, {params:para}).subscribe((res:any) => {
      this.loading.cancel();
      this.Data = res.data;
    }, error => {
      this.loading.cancel();
      console.log(error)
    })
  }

  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  
}
