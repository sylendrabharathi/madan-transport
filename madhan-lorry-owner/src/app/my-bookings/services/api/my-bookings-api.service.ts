import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyBookingsApiService {

  constructor(private api: ApiService) { }
  getMyBookings(transpoterId, bookingId) {
    return this.api.get('VehicleBookingEnqResponse/GetBookingEnqDetails/?name= &transporterId=' + transpoterId + '&isconfirmed=true&bid=' + bookingId + '&customerId=');
  }
}
