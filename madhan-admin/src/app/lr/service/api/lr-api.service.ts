import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LrApiService {

  constructor(private api: ApiService) { }

  getLrList() {
    return this.api.get('Booking/GetBookingCumDetails');
  }
  getLrDetails(bookingId) {
    return this.api.get('Booking/GetBookingDetails/?name=&bid=' + bookingId);
  }
  editLrDetails(bookingId, req) {
    // return this.api.put(this.)
  }
  addLr(req) { }

  getBookingNumbers() {
    return this.api.get('Booking/GetBookingIDs');
  }


}
