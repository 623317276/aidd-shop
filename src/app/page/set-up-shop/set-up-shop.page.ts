import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'q';




@Component({
  selector: 'app-set-up-shop',
  templateUrl: './set-up-shop.page.html',
  styleUrls: ['./set-up-shop.page.scss'],
})

export class SetUpShopPage implements OnInit {

  // @Input() type:string;
  public loginForm = this.formBuilder.group({

    'name': ['姓名', [Validators.required]],
    
    'idCardNumber': ['444444000011112222', [Validators.required]],

    'tel': ['18877777777', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],

    'agree': [false, [Validators.requiredTrue]],
    
    });

  constructor(
    public modalController: ModalController,
    public formBuilder:FormBuilder,
    public http: HttpClient,
    ) { }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  onSubmit(){
    forkJoin(
    this.http.post('http://localhost/app-admin/index/uploadimg',{
    //   params:{
    //     // file: this.files
    //      file: '111'
    // }
    file: 123
  }, {
    responseType: 'json'
  }),
  ).subscribe(()=>{

  },error=>{
    
  })
  }



  // 正面上传图片的操作
  public files = [
            // {
            //   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg' // 正面
            // },
            // {
            //   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg' // 反面
            // }
          ];
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
