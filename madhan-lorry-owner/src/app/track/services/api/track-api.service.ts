import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TrackApiService {

  constructor(private api: ApiService) { }

  getVehicleLiveLoc(vehicleId) {
    return this.api.get(`Vehicle/GetVehicleDetails/?cid=&vid=${vehicleId}`);
  }
}
