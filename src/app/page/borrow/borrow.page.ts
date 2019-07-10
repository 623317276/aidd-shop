import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.page.html',
  styleUrls: ['./borrow.page.scss'],
})
export class BorrowPage implements OnInit {

  constructor(
    public modal: ModalService
  ) { }

  ngOnInit() {
  }

  apply(type:string){
      this.modal.presentModal({type:type});
  }
}
