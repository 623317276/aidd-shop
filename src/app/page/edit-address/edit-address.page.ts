import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  @Input() data:any; 
  constructor(
  ) { 
    console.log(this.data);
  }

 

  ngOnInit() {
  }

}
