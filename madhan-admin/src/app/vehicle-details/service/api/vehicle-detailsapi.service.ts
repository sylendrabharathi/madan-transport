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
  getPolById(id) {
    return this.api.get(this.api.formUrl('PolbookingMapping', id));
  }
  getRateById(id) {
    return this.api.get(this.api.formUrl('rate', id));
  }
  getTrasnpoterRate() {
    return this.api.get('ReferenceList/GetRLByRLName/?name=TransporterRate');
  }
  getSpecificRate(rateFor, sourceId, destinationId) {
    return this.api.get('rate/GetSpecificRateDetails/?RateForId=' + rateFor + '&SourceId=' + sourceId + '&DestinationId=' + destinationId)
  }
  addVehicleBookingMapping(req) {
    return this.api.post('VehicleBookingMapping', req);
  }
}
