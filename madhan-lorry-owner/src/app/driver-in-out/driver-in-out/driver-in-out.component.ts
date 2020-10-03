import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverInOutApiService } from '../services/api/driver-in-out-api.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlertServiceService } from 'src/app/services/alert/alert-service.service';

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
    private ls: LocalStorageService,
    private toast: ToastService,
    private alert: AlertServiceService) { }

  ngOnInit() { }

  newDriverInOut() {
    this.route.navigate(['driver-in-out', 'create']);
  }
  ionViewWillEnter() {
    this.tranpoterId = Number(this.ls.getCustomerId());
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
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.deleteJson.driverInOutId = driverInOutId;
        this.deleteJson.refModifiedBy = this.tranpoterId;
        this.inOutApi.deleteInOut(this.deleteJson, driverInOutId).subscribe(success => {
          console.log('success', success);
          // this.drivers = success;
          this.toast.success(success[0].msg);
          this.ionViewWillEnter();
        },
          failure => {
            console.log('failure', failure);
          });
      }
    });
  }

}
