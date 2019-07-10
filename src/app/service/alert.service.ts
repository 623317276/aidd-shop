import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  async presentAlert(data:any=[]) {
    const alert = await this.alertController.create({
      header: data.title ? data.title : '',
      subHeader: data.subtitle ? data.subtitle : '',
      message: data.content ? data.content : '',
      buttons: ['OK']
    });

    await alert.present();
  }

}
