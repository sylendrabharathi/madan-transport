import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }
  loading: any;
  isLoading = false;

  async createLoader() {
    // this.loading = await this.loadingController.create({
    //   cssClass: 'spinner',
    //   message: 'Loading Please wait...',
    //   // duration: 3000,
    //   animated: true,
    //   mode: 'ios',
    //   showBackdrop: true,
    //   backdropDismiss: false,
    //   spinner: 'bubbles',

    // });

    // await this.loading.present();

    // return this.loading;

    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'spinner',
      message: 'Loading Please wait...',
      // duration: 3000,
      animated: true,
      mode: 'ios',
      showBackdrop: true,
      backdropDismiss: false,
      spinner: 'bubbles',

    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismissLoader() {
    
    // if (this.loading.present())
    //   this.loading.dismiss();
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async dismissLoading(loading) {
    await this.loadingController.dismiss().then( () => console.log('pop'));
    
  }
}
