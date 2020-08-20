import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingEnquiresApiService {

  constructor(private api: ApiService) { }

  getAllBookingEnq(ownerId) {
    return this.api.get('VehicleBookingEnqResponse/GetBookingEnqDetails/?name=&transporterId=' + ownerId);
  }
}
