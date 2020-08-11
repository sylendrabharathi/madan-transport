import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.scss'],
})
export class NewReceiptComponent implements OnInit {

  vehicleBookings = [];
  paymentPurposes = [];
  paymentModes = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getVehicelBookings();
    this.getPaymentPurposes();
    this.getPaymentModes();
  }

  getVehicelBookings() {
    for(let i = 0; i < 5; i++) {
      const obj = {
        vehicleBookingMappingId: i,
        polBookingMappingId: i,
        refBookingId: i,
        vehicleId: i,
        vehicleNo: `TN ${(i + 1) * 10} AA ${1111 * (i + 1)}`
      };
      this.vehicleBookings.push(obj);
    }
  }

  getPaymentPurposes() {
    this.paymentPurposes = [{id: 1, name: 'Advance'}, {id: 1, name: 'Settlement'}, {id: 3, name: 'Toll Fee'}];
  }

  getPaymentModes() {
    this.paymentModes = [{id: 1, name: 'Cash'}, {id: 2, name: 'Card'}, {id: 3, name: 'UPI Payment'}, {id: 4, name: 'Paytm'}];
  }

  submit() {
    this.router.navigate(['booking-receipt']);    
  }

}
