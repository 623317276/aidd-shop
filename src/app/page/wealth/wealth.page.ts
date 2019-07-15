import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-wealth',
  templateUrl: './wealth.page.html',
  styleUrls: ['./wealth.page.scss'],
})
export class WealthPage implements OnInit {

  public segment:string = 'balance'; // 用于控制选中

  public loginForm = this.formBuilder.group({

    'number': [0, [Validators.required]],
    
    });
    
  constructor(
    public http: HttpClient,
    public toast:ToastService,
    public formBuilder:FormBuilder,
  ) { }

  ngOnInit() {
  }

  onSubmit(type:string='balance'){

    if(this.loginForm.controls.number.value === 0 || this.loginForm.controls.number.value < 0){
        this.toast.presentToast('数量错误');
        return false;
    }
    forkJoin(
      this.http.post('',[
        {
          type:type,
          number:this.loginForm.controls.number.value,
        }
      ]),
      ).subscribe(res => {
  
      },error => {
  
      })
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    console.log(this.segment);

  }

  // 正面上传图片的操作
  public files = [];
  public multiple = false;
  public multipleTab = 0;
  changeMultiple(value: number) {
  this.multipleTab = value;
  }
  fileChange(params) {
  console.log(params);
  const { files, type, index } = params;
  this.files = files;
  }
  imageClick(params) {
  console.log(params);
  }

}
