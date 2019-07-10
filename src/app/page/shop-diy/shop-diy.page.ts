import { Component, OnInit } from '@angular/core';
import { defaultComparator } from '@angular/common/src/pipes/keyvalue_pipe';

@Component({
  selector: 'app-shop-diy',
  templateUrl: './shop-diy.page.html',
  styleUrls: ['./shop-diy.page.scss'],
})
export class ShopDiyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // 模拟input点击
  getImage(){
    var eleLink = document.getElementById('file');
    eleLink.click();
  }

  // 获取file并且显示
  getUpload(e:any) {
    if (e.target.files[0]) {
      let file = e.target.files[0];

      let fileReader = new FileReader();
      fileReader.onload = () => {
        // var eleLink = document.createElement('img');
        // eleLink.src = '' + fileReader.result;
        // eleLink.style.width = '150px';
        // eleLink.style.borderRadius = '50%';
        // eleLink.style.zIndex = '2';
        // eleLink.style.position = 'absolute';
        // eleLink.style.left = 'calc(50% - 75px)';
        // eleLink.style.top = '0px';
        // eleLink.src = ''+fileReader.result;
        // eleLink.id = 'img';
        // document.body.appendChild(eleLink);
          document.getElementById('img')['src'] = fileReader.result;
      };
      
      fileReader.readAsDataURL(file);
    }
   }

   // ArrayBuffer转为字符串，参数为ArrayBuffer对象
public ab2str(buf:any) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

}
