import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShareListPage } from './share-list.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

const routes: Routes = [
  {
    path: '',
    component: ShareListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgZorroAntdMobileModule
  ],
  declarations: [ShareListPage]
})
export class ShareListPageModule {}
