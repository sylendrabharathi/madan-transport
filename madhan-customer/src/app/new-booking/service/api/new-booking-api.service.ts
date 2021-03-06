import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewBookingApiService {

  constructor(private api: ApiService) { }

  getMaterials() {
    return this.api.get('ReferenceList/GetRLByRName/?name=Material');
  }

  getVehicleTypes() {
    return this.api.get('ReferenceList/GetRLByRName/?name=VehicleType');
  }

  getLocations() {
    return this.api.get('rate/GetRateByName/?name=CustomerRate');
  }

  getPols() {
    return this.api.get('Polpod/GetPolpodByName/?name=POl');
  }

  getPods() {
    return this.api.get('Polpod/GetPolpodByName/?name=POD');
  }

  getRateDetails(sourceId, rlRateForId, destinationId) {
    return this.api.get(`rate/GetSpecificRateDetailsbyName/?RateForId=${rlRateForId}&Source=${sourceId}&Destination=${destinationId}`);
  }

  save(req) {
    return this.api.post('Booking', req);
  }
  getPolPods() {
    return this.api.get('Polpod/GetPolpod');
  }
  getVehicleByType(name) {
    return this.api.get('ReferenceList/GetRLByRLDesclike/?name=' + name);
  }
  getBooking(bid) {
    return this.api.get('Booking/GetBookingDetails/?bid=' + bid);
  }
  getRateById(rId) {
    return this.api.get('rate/' + rId);
  }
}
