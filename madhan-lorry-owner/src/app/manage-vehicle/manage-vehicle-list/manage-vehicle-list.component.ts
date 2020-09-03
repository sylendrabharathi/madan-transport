import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageVehicleApiService } from '../services/api/manage-vehicle-api.service';

@Component({
  selector: 'app-manage-vehicle-list',
  templateUrl: './manage-vehicle-list.component.html',
  styleUrls: ['./manage-vehicle-list.component.scss'],
})
export class ManageVehicleListComponent implements OnInit {

  vehicles: any = [];
  transpoterId = 4;
  vehicleId = '';
  constructor(private router: Router,
    private vehicleApi: ManageVehicleApiService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getVehicles(this.transpoterId, this.vehicleId);
  }

  getVehicles(transpoterId, vehicleId) {
    this.vehicleApi.getVehicles(transpoterId, vehicleId).subscribe(success => {
      console.log('vehiclesuccess', success);
      this.vehicles = success;
    },
      failure => {
        console.log('vehiclefailure', failure);
      });
  }
  createVehicle() {
    this.router.navigate(['manage-vehicle', 'create']);
  }
  edit(vehicleId) {
    this.router.navigate(['manage-vehicle', 'edit', vehicleId]);
  }
}
