import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageVehicleApiService } from '../services/api/manage-vehicle-api.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlertServiceService } from 'src/app/services/alert/alert-service.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';

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
    private ls: LocalStorageService,
    private toast: ToastService,
    private alert: AlertServiceService,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    // this.transpoterId = 6;
    console.log('this', this.transpoterId);
    this.getVehicles(this.transpoterId, this.vehicleId);
  }

  getVehicles(transpoterId, vehicleId) {
    this.loader.createLoader();
    this.vehicleApi.getVehicles(transpoterId, vehicleId).subscribe(success => {
      console.log('vehiclesuccess', success);
      this.vehicles = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('vehiclefailure', failure);
      });
    this.loader.dismissLoader();
  }
  createVehicle() {
    this.router.navigate(['manage-vehicle', 'create']);
  }
  edit(vehicleId) {
    this.router.navigate(['manage-vehicle', 'edit', vehicleId]);
  }
  deleteVehicle(vehicleId) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        this.deleteJson.VehicleId = vehicleId;
        this.deleteJson.RefModifiedBy = this.transpoterId;
        this.vehicleApi.deleteVehicle(vehicleId, this.deleteJson).subscribe(success => {
          console.log('success', success);
          this.loader.dismissLoader();
          this.toast.success(success[0].msg);
          this.ionViewWillEnter();
        },
          failure => {
            this.loader.dismissLoader();
            console.log('failure', failure);
            this.toast.danger(failure[0].msg)
          });
      }
    });
    this.loader.dismissLoader();
  }

}
