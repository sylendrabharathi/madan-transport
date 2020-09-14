import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageVehicleApiService } from '../services/api/manage-vehicle-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manage-vehicle-list',
  templateUrl: './manage-vehicle-list.component.html',
  styleUrls: ['./manage-vehicle-list.component.scss'],
})
export class ManageVehicleListComponent implements OnInit {

  vehicles: any = [];
  transpoterId: number;
  vehicleId = '';
  deleteJson: any = {};
  constructor(private router: Router,
    private vehicleApi: ManageVehicleApiService,
    private toaster: ToastController) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(localStorage.getItem('customerId'));
    // this.transpoterId = 6;
    console.log('this', this.transpoterId);
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
  deleteVehicle(vehicleId) {
    this.deleteJson.VehicleId = vehicleId;
    this.deleteJson.RefModifiedBy = this.transpoterId;
    this.vehicleApi.deleteVehicle(vehicleId, this.deleteJson).subscribe(success => {
      console.log('success', success);
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
