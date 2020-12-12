import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(
    private alertController: AlertController
  ) { }

  public async alertPromt(header, message): Promise<boolean> {
    let confirmation = false;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      animated: true,
      // backdrop-dismiss:true,
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',

        }, {
          text: 'Ok',
          handler: (alertData) => {
            confirmation = true;
            return confirmation;

          }
        }
      ]
    });

    await alert.present();

    await alert.onDidDismiss().then((data) => {
      // confirmation = data
      console.log('data->', data);

    })
    return confirmation;

  }
  public async noEditAlert(header, message) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      animated: true,
      // backdrop-dismiss:true,
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',

        }
      ]
    });

    await alert.present();

  }
}
