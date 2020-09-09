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
  saveVehicle(vehicleData) {
    return this.api.post('Vehicle', vehicleData);
  }
  editVehicle(vehicleData, vehicleId) {
    return this.api.put(this.api.formUrl('Vehicle', vehicleId), vehicleData);
  }
  deleteVehicle(vehicleId, vehicleData) {
    return this.api.delete(this.api.formUrl('Vehicle', vehicleId), vehicleData);
  }
}
