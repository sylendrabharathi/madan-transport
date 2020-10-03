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
  getVehicleId() {
    return this.api.get('VehicleBookingMapping/GetVBMDetails');
  }
  getpaymentDetails(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }

  addRecipt(newRecipt) {
    return this.api.post('BookingReceipt', newRecipt);
  }
  getRecipt(reciptId) {
    return this.api.get(this.api.formUrl('BookingReceipt', reciptId));
  }
  editRecipt(reciptId, req) {
    return this.api.put(this.api.formUrl('BookingReceipt', reciptId), req);
  }
  deleteRecipt(reciptId, req) {
    return this.api.delete(this.api.formUrl('BookingReceipt', reciptId), req);
  }
}
