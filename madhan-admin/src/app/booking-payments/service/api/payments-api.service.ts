import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(private api: ApiService) { }

  getBookingPayments(paymentId, bookingId, mappingId) {
    return this.api.get(`BookingPayments/GetBookingPaymentsDetails/?bookingPaymentsId=${paymentId}&bookingId=${bookingId}
    &VehicleBookingMappingId=${mappingId} `);
  }

}
