import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from "../service/common.service";
import { LocalstorageService } from '../service/localstorage.service';
import { ToastService } from '../service/toast.service';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public segment:string = 'person'; // 用于控制选中

  constructor(
    public common: CommonService,
    public localstorage: LocalstorageService,
    public router: Router,
    public toast: ToastService,
    public modal: ModalService,
    ) {
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.segment = ev.detail.value;
    console.log(this.segment);

  }

  changePws(type:string='pay'){
      this.modal.presentModal({type:type});
  }

  logout(){
      this.common.logout();
  }
  
}
