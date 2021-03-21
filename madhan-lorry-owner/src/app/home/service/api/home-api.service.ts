import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor(private api: ApiService) { }
  getTransportRate() {
    return this.api.get('rate/GetRateByName/?name=TransporterRate');
  }
  updateLorryLocation(vehicleId, req) {
    return this.api.put(`vehicle/PutLiveLocation/?id=${vehicleId}`, req);
  }
  getVehicleId(driverId) {
    return this.api.get(`DriverInOut/GetDriverInOutDetails/?did=${driverId}`);
  }
}
