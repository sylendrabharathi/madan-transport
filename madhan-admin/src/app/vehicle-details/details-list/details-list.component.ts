import { Component, OnInit } from '@angular/core';
import { VehicleDetailsapiService } from '../service/api/vehicle-detailsapi.service';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss'],
})
export class DetailsListComponent implements OnInit {

  vehiclesList: any = [];

  constructor(private vehicleDetailsApi: VehicleDetailsapiService) { }

  ngOnInit() {
    // this.getDetailsList();
    this.getWillingTruck();
  }

  getDetailsList() {
    for (let i = 0; i < 15; i++) {
      const detail = {
        id: 'Book' + (i + 1),
        customer: 'HP Printers',
        transporterName: 'Suresh',
        vehicleNo: 'TN 46 B 8888',
        location: 'Chennai',
        mobileNo: '9632587410',
        vehicleType: 'container'
      };
      this.vehiclesList.push(detail);
    }
  }

  getWillingTruck() {
    this.vehicleDetailsApi.getWillingVehicles().pipe().subscribe(success => {
      console.log('success', success);
      this.vehiclesList = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
}
