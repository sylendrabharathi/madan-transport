import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleDetailsapiService {

  constructor(private api: ApiService) { }

  getWillingVehicles() {
    return this.api.get('BookingFlowReports/getAdminVehicleWillingDetails');
  }
}
