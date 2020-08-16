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
  getpaymentMode() {
    return this.api.get('ReferenceList/GetRLByRName/?name=PaymentMode');
  }
  getPaymentPurpose() {
    return this.api.get('ReferenceList/GetRLByRName/?name=PaymentPurpose');
  }
  addPayment(newPaymnet) {
    return this.api.put('BookingPayments', newPaymnet);
  }

  getVehicleId() {
    return this.api.get('VehicleBookingMapping/GetVBMDetails');
  }
}
