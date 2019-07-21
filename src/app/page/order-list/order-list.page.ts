import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
    public segment:string = 'allList'; // 用于控制选中

  constructor(
    public router: Router,
  ) {
      
   }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    console.log(this.segment);

  }

  detail(){
    this.router.navigate(['/order-detail']);
  }
}
