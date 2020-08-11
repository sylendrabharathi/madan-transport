import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor(private api: ApiService) { }

  getICData() {
    return this.api.get('api/BookingFlowReports/getAdminDashboard');
  }
  getFindTruck(source) {
    return this.api.get('api/BookingFlowReports/getAdminFindTruck/?Location=' + source);
  }
}
