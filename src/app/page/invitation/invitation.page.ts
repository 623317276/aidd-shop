import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../service/localstorage.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {
  public userInfo:any = {};

  constructor(
    public localstorage:LocalstorageService,
    public common:CommonService,
  ) {
    this.userInfo = this.localstorage.getObject('userInfo');
   }

  ngOnInit() {
  }

}
