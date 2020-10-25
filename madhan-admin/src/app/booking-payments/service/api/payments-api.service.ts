import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(private api: ApiService) { }

  getBookingPaymentsList(paymentId, bookingId, mappingId) {
    return this.api.get(`BookingPayments/GetBookingPaymentsDetails/?bookingPaymentsId=${paymentId}&bookingId=${bookingId}
    &VehicleBookingMappingId=${mappingId} `);
  }
  getRefernceListData(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }

  addPayment(newPaymnet) {
    return this.api.post('BookingPayments', newPaymnet);
  }

  getVehicleId() {
    return this.api.get('VehicleBookingMapping/GetVBMDetails');
  }
  getVehicleIdByBookingId(bid) {
    return this.api.get('VehicleBookingMapping/GetVBMDetails?bid=' + bid);
  }
  editBookingPayment(bookingPaymentId, data) {
    return this.api.put(this.api.formUrl('BookingPayments', bookingPaymentId), data);
  }
  deleteBookingPayment(bookingPaymentId, data) {
    return this.api.delete(this.api.formUrl('BookingPayments', bookingPaymentId), data);
  }
  getBookignPaymentById(bookingPaymentId) {
    return this.api.get(this.api.formUrl('BookingPayments', bookingPaymentId));
  }
}
