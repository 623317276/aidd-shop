import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { IonicModule } from '@ionic/angular';

import { SetUpShopPage } from './set-up-shop.page';

const routes: Routes = [
  {
    path: '',
    component: SetUpShopPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgZorroAntdMobileModule
  ],
  declarations: [SetUpShopPage]
})
export class SetUpShopPageModule {}
