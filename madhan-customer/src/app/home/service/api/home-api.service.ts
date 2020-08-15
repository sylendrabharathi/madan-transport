import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor(private apiService: ApiService) { }

  getRates() {
    return this.apiService.get('rate/GetRateByName/?name=CustomerRate');
  }
}
