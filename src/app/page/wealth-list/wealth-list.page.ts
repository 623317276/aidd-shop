import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wealth-list',
  templateUrl: './wealth-list.page.html',
  styleUrls: ['./wealth-list.page.scss'],
})
export class WealthListPage implements OnInit {
  public segment:string = 'balance'; // 用于控制选中

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.segment = ev.detail.value;
    console.log(this.segment);

  }
}
