import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PaymentsApiService } from '../service/api/payments-api.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent implements OnInit {
  bookingPayments: any = [];
  constructor(private router: Router, private paymentApi: PaymentsApiService,
    private toaster: ToastController) { }

  ngOnInit() { }
  ionViewWillEnter() {
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
    this.paymentApi.getBookingPaymentsList(paymentId, bookingId, mappingId).pipe().subscribe(success => {
      console.log('success', success);
      this.bookingPayments = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  editpayment(paymentId) {
    this.router.navigate(['booking-payments', 'edit', paymentId]);
  }
  deletePayment(paymentId) {
    let req: any = {};
    req.RefModifiedBy = 1;
    req.BookingPaymentsId = paymentId;
    console.log(req);

    this.paymentApi.deleteBookingPayment(paymentId, req).subscribe(
      success => {
        console.log('delete Data', success);
        if (success[0].status == 3) {
          this.Toaster(success[0].msg, 'success');
          this.ionViewWillEnter();
          return;
        }
        this.Toaster(success[0].msg, 'danger');
      }, failure => {
        console.log('ediutdatafail', failure);
      }
    );
  }
  async Toaster(message, color) {
    console.log('inside-->');
    let toast: any;

    toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: color,
      mode: "ios"
    });

    toast.present();
  }
}
