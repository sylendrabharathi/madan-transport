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
  getFromRefernceList(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }

  addRate(newRateData) {
    return this.api.post('rate', newRateData);
  }
  getRateById(rateId) {
    return this.api.get(this.api.formUrl('rate', rateId));
  }
  editRate(rateId, req) {
    return this.api.put(this.api.formUrl('rate', rateId), req);
  }

  deleteRate(rateId, req) {
    return this.api.delete(this.api.formUrl('rate', rateId), req);
  }
}

