import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angular2-qrcode';
import { ProductSharePage } from './product-share.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

const routes: Routes = [
  {
    path: '',
    component: ProductSharePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgZorroAntdMobileModule,
    QRCodeModule
  ],
  declarations: [ProductSharePage]
})
export class ProductSharePageModule {}
