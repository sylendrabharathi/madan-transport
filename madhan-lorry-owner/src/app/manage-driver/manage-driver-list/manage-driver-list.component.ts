import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';

@Component({
  selector: 'app-manage-driver-list',
  templateUrl: './manage-driver-list.component.html',
  styleUrls: ['./manage-driver-list.component.scss'],
})
export class ManageDriverListComponent {

  constructor(private router: Router,
    private driverApi: ManageDriverApiService) { }
  drivers: any = [];
  ngOnInit() { }

  ionViewWillEnter() {
    console.log('hhhh');

    this.getDriverList(4);
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
  edit(driverId) {
    this.router.navigate(['manage-driver', 'edit', driverId]);
  }
}
