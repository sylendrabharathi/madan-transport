import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RateApiService {
  constructor(private api: ApiService) { }

  getRateList(rateType) {
    return this.api.get('api/rate/GetRateByName/?name=' + rateType);
  }
}
