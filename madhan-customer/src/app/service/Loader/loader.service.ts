import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }
  loading: any;
  async createLoader() {
    this.loading = await this.loadingController.create({
      cssClass: 'spinner',
      message: 'Loading Please wait...',
      // duration: 3000,
      animated: true,
      mode: 'ios',
      showBackdrop: true,
      backdropDismiss: false,
      spinner: 'bubbles',

    });

    await this.loading.present();
  }
  dismissLoader() {
    if (this.loading.present())
      this.loading.dismiss();
  }
}
