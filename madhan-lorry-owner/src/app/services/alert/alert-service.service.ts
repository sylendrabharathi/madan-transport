import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(
    private alertController: AlertController
  ) { }

  public async alertPromt(): Promise<boolean> {
    let confirmation = false;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      animated: true,
      // backdrop-dismiss:true,
      header: 'Confirmation ',
      message: `Are you sure you want to delete? `,
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
}
