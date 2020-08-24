import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DriverInOutApiService {

  constructor(private api: ApiService) { }
  getdriverInOut(transpoterId) {
    return this.api.get('DriverInOut/GetDriverInOutDetails/?cid=' + transpoterId);
  }
  getDrivers(transpoterId) {
    return this.api.get('Driver/GetDriverDetails?cid=' + transpoterId);
  }
  getVehicles(transpoterId) {
    return this.api.get('Vehicle/GetVehicleDetails/?cid=' + transpoterId);
  }
  getInOutDetail(driverId) {
    return this.api.get(this.api.formUrl('DriverInOut', driverId));
  }
}
