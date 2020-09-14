import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverInOutApiService } from '../services/api/driver-in-out-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-driver-in-out',
  templateUrl: './driver-in-out.component.html',
  styleUrls: ['./driver-in-out.component.scss'],
})
export class DriverInOutComponent implements OnInit {

  drivers: any = [];
  deleteJson: any = {};
  tranpoterId;
  constructor(private route: Router,
    private inOutApi: DriverInOutApiService,
    private toaster: ToastController) { }

  ngOnInit() { }

  newDriverInOut() {
    this.route.navigate(['driver-in-out', 'create']);
  }
  ionViewWillEnter() {
    this.tranpoterId = Number(localStorage.getItem('customerId'));
    this.getDriverInOut(this.tranpoterId);
  }
  getDriverInOut(transpoterId) {
    this.inOutApi.getdriverInOut(transpoterId).subscribe(success => {
      console.log('success', success);
      this.drivers = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  edit(driverInOutId) {
    this.route.navigate(['driver-in-out', driverInOutId, 'edit']);
  }
  deleteDetails(driverInOutId) {
    this.deleteJson.driverInOutId = driverInOutId;
    this.deleteJson.refModifiedBy = this.tranpoterId;
    this.inOutApi.deleteInOut(this.deleteJson, driverInOutId).subscribe(success => {
      console.log('success', success);
      // this.drivers = success;
      this.successToaster(success[0].msg);
      this.ionViewWillEnter();
    },
      failure => {
        console.log('failure', failure);
      });
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
