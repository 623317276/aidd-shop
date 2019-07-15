import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingController: LoadingController
  ) { }

  async presentLoading(loadingData:any={message:'',duration:200}) {
    loadingData.message = loadingData.message ? loadingData.message : '';
    loadingData.duration = loadingData.duration ? loadingData.duration : 200;
    const loading = await this.loadingController.create({
      message: loadingData.message,
      duration: loadingData.duration
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
