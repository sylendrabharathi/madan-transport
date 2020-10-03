import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlertServiceService } from 'src/app/services/alert/alert-service.service';

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
    private ls: LocalStorageService,
    private toast: ToastService,
    private alert: AlertServiceService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userId = Number(this.ls.getUserId());
    this.transpoterId = Number(this.ls.getCustomerId());
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
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.driverDeleteJson.driverId = driverId;
        this.driverDeleteJson.refrefCreatedBy = this.userId;
        this.driverApi.deleteDriver(this.driverDeleteJson, driverId).subscribe(success => {
          console.log('success', success);
          this.toast.success(success[0].msg);
          this.ionViewWillEnter();
        }, failure => { });
      }
    });
  }

}
