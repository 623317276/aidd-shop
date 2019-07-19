import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from "../../service/common.service";
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
    public sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.type = params['type'];
      })
      switch (this.type) {
        case 'aboutUs':
          this.title = '关于我们';
          this.getData();
          break;  
        case 'rule':
          this.title = '规则';
          this.getData();
          break;      
              
        default:
          break;
      }
      
  }

  getData(){
    this.http.get(this.common.aboutUs, {params:{type:this.type}}).subscribe((res:any) => {
      this.Data = res.data;
    }, error => {
      console.log(error)
    })
  }

  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  
}
