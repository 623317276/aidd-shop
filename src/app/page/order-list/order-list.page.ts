import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
    public segment:string = 'balance'; // 用于控制选中
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    console.log(this.segment);

  }
}
