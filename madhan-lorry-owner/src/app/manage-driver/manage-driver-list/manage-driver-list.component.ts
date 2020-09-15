import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manage-driver-list',
  templateUrl: './manage-driver-list.component.html',
  styleUrls: ['./manage-driver-list.component.scss'],
})
export class ManageDriverListComponent {

  drivers: any = [];
  driverDeleteJson: any = {};
  userId: number;
  transpoterId: number;
  constructor(private router: Router,
    private driverApi: ManageDriverApiService,
    private toaster: ToastController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userId = Number(localStorage.getItem('userId'));
    this.transpoterId = Number(localStorage.getItem('customerId'));
    this.getDriverList(this.transpoterId);
  }

  getDriverList(transpoterId) {
    console.log('inside');

    this.driverApi.getDriverDetails(transpoterId).subscribe(success => {
      console.log('success', success);
      this.drivers = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  createDriver() {
    this.router.navigate(['manage-driver', 'create']);
  }
  edit(driver) {
    this.router.navigate(['manage-driver', 'edit', driver.driverId, driver.userId]);
  }
  deleteDriver(driverId) {
    this.driverDeleteJson.driverId = driverId;
    this.driverDeleteJson.refrefCreatedBy = this.userId;
    this.driverApi.deleteDriver(this.driverDeleteJson, driverId).subscribe(success => {
      console.log('success', success);
      this.successToaster(success[0].msg);
      this.ionViewWillEnter();
    }, failure => { });
  }
  async successToaster(message) {
    console.log('inside-->');
    let toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: "success",
      mode: "ios"
    });


    toast.present();
  }
}
