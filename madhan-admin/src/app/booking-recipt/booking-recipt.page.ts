import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-recipt',
  templateUrl: './booking-recipt.page.html',
  styleUrls: ['./booking-recipt.page.scss'],
})
export class BookingReciptPage implements OnInit {

  bookingReceipts = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.getBookingReceipts();
  }

  getBookingReceipts() {
    for(let i = 0; i < 10; i++) {
      const obj = {
        RefBookingId: i + 1,
        RefReferenceListModelId: i % 2 === 0 ? 'Cash': 'Card',
        RefReferenceListPayPurposeId: i % 2 === 0 ? 'Settlement' : 'Advance',
        ReceiptDate: new Date(),
        Amount: (100 * (i + 1)).toFixed(2)
      };
      this.bookingReceipts.push(obj);
    }
  }

  newBookingReceipt() {
    this.router.navigate(['booking-receipt', 'new']);
    
  }

}
