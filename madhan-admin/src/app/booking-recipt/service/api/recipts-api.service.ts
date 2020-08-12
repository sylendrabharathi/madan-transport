import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReciptsApiService {

  constructor(private api: ApiService) { }

  getBookingRecipts(paymentId, bookingId, mappingId) {
    return this.api.get(`BookingReceipt/GetBookingReceiptDetails/?=BookingReceiptId=${paymentId}&bookingId=${bookingId}
    &VehicleBookingMappingId=${mappingId} `);
  }
}
