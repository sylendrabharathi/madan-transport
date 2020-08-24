import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverInOutApiService } from '../services/api/driver-in-out-api.service';

@Component({
  selector: 'app-driver-in-out',
  templateUrl: './driver-in-out.component.html',
  styleUrls: ['./driver-in-out.component.scss'],
})
export class DriverInOutComponent implements OnInit {

  drivers: any = [];
  constructor(private route: Router,
    private inOutApi: DriverInOutApiService) { }

  ngOnInit() { }

  newDriverInOut() {
    this.route.navigate(['driver-in-out', 'create']);
  }
  ionViewWillEnter() {
    this.getDriverInOut(4);
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
}
