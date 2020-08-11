import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentsApiService } from '../service/api/payments-api.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent implements OnInit {
  bookingPayments: any = [];
  constructor(private router: Router, private paymentApi: PaymentsApiService) { }

  ngOnInit() {
    // this.getBookingPayments();
    this.getbookingPaymentList('', '', '');

  }

  getBookingPayments() {
    for (let i = 0; i < 10; i++) {
      const obj = {
        RefBookingId: i + 1,
        RefReferenceListModelId: i % 2 === 0 ? 'Cash' : 'Card',
        RefReferenceListPayPurposeId: i % 2 === 0 ? 'Settlement' : 'Advance',
        ReceiptDate: new Date(),
        Amount: (100 * (i + 1)).toFixed(2)
      };
      this.bookingPayments.push(obj);
    }
  }
  newBookingPayments() {
    this.router.navigate(['booking-payments', 'new']);

  }
  getbookingPaymentList(paymentId, bookingId, mappingId) {
    this.paymentApi.getBookingPayments(paymentId, bookingId, mappingId).pipe().subscribe(success => {
      console.log('success', success);
      this.bookingPayments = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }

}
