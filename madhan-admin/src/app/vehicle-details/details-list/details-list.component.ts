import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { VehicleDetailsapiService } from '../service/api/vehicle-detailsapi.service';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss'],
})
export class DetailsListComponent implements OnInit {

  vehiclesList: any = [];

  constructor(private vehicleDetailsApi: VehicleDetailsapiService,
    private loader: LoaderService,
    private alert: AlertServiceService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getWillingTruck();
  }

  getWillingTruck() {
    this.loader.createLoader();
    this.vehicleDetailsApi.getWillingVehicles().pipe().subscribe(success => {
      console.log('success', success);
      this.vehiclesList = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  confirm() {
    this.alert.alertPromt(`Send confirmation ? `).then(data => {
      if (Boolean(data)) {
      }
    });
  }
}
