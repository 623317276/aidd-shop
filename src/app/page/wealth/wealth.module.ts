import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { IonicModule } from '@ionic/angular';

import { WealthPage } from './wealth.page';

const routes: Routes = [
  {
    path: '',
    component: WealthPage
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
  declarations: [WealthPage]
})
export class WealthPageModule {}
