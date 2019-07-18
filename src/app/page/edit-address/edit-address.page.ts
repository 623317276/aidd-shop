import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  @Input() data:any; 
  constructor(
    public modalController: ModalController,

  ) { 
    
  }

 

  ngOnInit() {
    console.log(this.data);
  }

  cancel(){
    this.modalController.dismiss();
  }
}
