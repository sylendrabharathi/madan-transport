import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ReciptsApiService } from './service/api/recipts-api.service';

@Component({
  selector: 'app-booking-recipt',
  templateUrl: './booking-recipt.page.html',
  styleUrls: ['./booking-recipt.page.scss'],
})
export class BookingReciptPage implements OnInit {

  bookingReceipts: any = [];
  constructor(private router: Router, private reciptsApi: ReciptsApiService,
    private toaster: ToastController) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getbookingReciptsList('', '', '');
  }

  newBookingReceipt() {
    this.router.navigate(['booking-receipt', 'new']);
  }

  getbookingReciptsList(paymentId, bookingId, mappingId) {
    this.reciptsApi.getBookingRecipts(paymentId, bookingId, mappingId).pipe().subscribe(success => {
      console.log('success', success);
      this.bookingReceipts = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }

  editBookingRecipt(reciptId) {
    this.router.navigate(['booking-receipt', 'edit', reciptId]);
  }

  deleteBookingRecipt(reciptId) {
    let req: any = {};
    req.bookingReceiptId = reciptId;
    req.refModifiedBy = 1;
    this.reciptsApi.deleteRecipt(reciptId, req).subscribe(success => {
      console.log('success', success);
      if (success[0].status == 3) {
        this.Toaster(success[0].msg, 'success');
        this.ionViewWillEnter();
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    }, failure => {
      this.Toaster(failure[0].msg, 'danger');
      console.log();
    });
  }

  async Toaster(message, color) {
    console.log('inside-->');
    let toast = await this.toaster.create({
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
