import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RateApiService {
  constructor(private api: ApiService) { }

  getRateList(rateType) {
    return this.api.get('rate/GetRateByName/?name=' + rateType);
  }
  getRateFor() {
    return this.api.get('ReferenceList/GetRLByRName/?name=rate');
  }
  getLocations() {
    return this.api.get('ReferenceList/GetRLByRName/?name=LodingPoints');
  }
  addRate(newRateData) {
    return this.api.post('rate', newRateData);
  }

}

