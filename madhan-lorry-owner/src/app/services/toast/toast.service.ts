import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastServictoastCtrl: ToastController) { }

  private async presentToast(msg, color) {
    const toast = await this.toastServictoastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: color,
      mode: 'ios'
    });

    toast.present();
  }

  success(msg) {
    this.presentToast(msg, 'success');
  }

  warning(msg) {
    this.presentToast(msg, 'warning');
  }

  danger(msg) {
    this.presentToast(msg, 'danger');
  }

}
