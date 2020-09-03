import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageVehicleApiService {

  constructor(private api: ApiService) { }
  getVehicles(transpoterId, vehicleId) {
    return this.api.get('Vehicle/GetVehicleDetails/?cid=' + transpoterId + '&vid=' + vehicleId);
  }
  getByReferenceList(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }

}
