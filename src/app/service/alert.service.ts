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

  // public confirm:any = {
  //    "header" : '注意',
  //    "message" : '<strong>确定要删除吗？</strong>',
  //    "cancelButton" : '取消',
  //    "okButton" : '确定',
  // };
  async presentAlertConfirm(confirm:any = {}, params:any = {}, cb?: Function) {
    let config = {
      "header" : '注意',
      "message" : '<strong>确定要删除吗？</strong>',
      "cancelButton" : '取消',
      "okButton" : '确定',
    };
    config.header = confirm.header ? confirm.header : config.header;
    config.message = confirm.message ? confirm.message : config.message;
    config.cancelButton = confirm.cancelButton ? confirm.cancelButton : config.cancelButton;
    config.okButton = confirm.okButton ? confirm.okButton : config.okButton;
    const alert = await this.alertController.create({
      header: config.header,
      message: config.message,
      buttons: [
        {
          text: config.cancelButton,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: config.okButton,
          handler: () => {
            cb(params);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  // 输入支付密码
  async presentAlertPrompt(confirm:any = {}, params:any = {}, cb?: Function) {
    let config = {
      "header" : '注意',
      "message" : '<strong>输入支付密码</strong>',
      "cancelButton" : '取消',
      "okButton" : '确定',
      "placeholder" : '输入支付密码',
    };
    config.header = confirm.header ? confirm.header : config.header;
    config.message = confirm.message ? confirm.message : config.message;
    config.cancelButton = confirm.cancelButton ? confirm.cancelButton : config.cancelButton;
    config.okButton = confirm.okButton ? confirm.okButton : config.okButton;
    let param = {
      'type' : 'pay',
      'psw' : '',
    };
    param.type = params.type ? params.type : param.type;
    param.psw = params.psw ? params.psw : param.psw;
    const alert = await this.alertController.create({
      header: config.header,
      inputs: [
        {
          name: 'psw',
          type: 'password',
          placeholder: config.placeholder,
          // value: ''
        },
      ],
      buttons: [
        {
          text: config.cancelButton,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: config.okButton,
          handler: (res) => {
            cb(res);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Radio 4',
          value: 'value4'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Radio 5',
          value: 'value5'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Checkbox',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2'
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3'
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Checkbox 4',
          value: 'value4'
        },

        {
          name: 'checkbox5',
          type: 'checkbox',
          label: 'Checkbox 5',
          value: 'value5'
        },

        {
          name: 'checkbox6',
          type: 'checkbox',
          label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
