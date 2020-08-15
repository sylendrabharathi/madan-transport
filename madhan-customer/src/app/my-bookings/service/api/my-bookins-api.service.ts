import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyBookinsApiService {

  constructor(private api: ApiService) { }

  getMyBookings(id) {
    return this.api.get(`VehicleBookingEnqResponse/GetBookingEnqDetails/?customerid=${id}`);
  }
}
