import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angular2-qrcode';

import { ProductShareEditPage } from './product-share-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductShareEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    QRCodeModule
  ],
  declarations: [ProductShareEditPage]
})
export class ProductShareEditPageModule {}
