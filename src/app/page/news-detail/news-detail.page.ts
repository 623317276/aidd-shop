import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  @Input() data:any;
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }
}
