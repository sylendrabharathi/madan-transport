import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LrApiService {

  constructor(private api: ApiService) { }

  getLrList() {
    return this.api.get(this.api.formUrl('Booking/GetBookingDetails', '?name=VC'));
  }
}
