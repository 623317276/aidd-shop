import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-manage-edit-goods',
  templateUrl: './manage-edit-goods.page.html',
  styleUrls: ['./manage-edit-goods.page.scss'],
})
export class ManageEditGoodsPage implements OnInit {

  public id:string = ''; // 商品id
  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

}
