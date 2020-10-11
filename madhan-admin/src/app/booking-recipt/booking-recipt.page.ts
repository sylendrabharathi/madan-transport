import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertServiceService } from '../service/alert/alert-service.service';
import { LoaderService } from '../service/Loader/loader.service';
import { ToastService } from '../service/toast/toast.service';
import { ReciptsApiService } from './service/api/recipts-api.service';

@Component({
  selector: 'app-booking-recipt',
  templateUrl: './booking-recipt.page.html',
  styleUrls: ['./booking-recipt.page.scss'],
})
export class BookingReciptPage implements OnInit {

  bookingReceipts: any = [];
  constructor(private router: Router,
    private reciptsApi: ReciptsApiService,
    private toaster: ToastService,
    private alert: AlertServiceService,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getbookingReciptsList('', '', '');
  }

  newBookingReceipt() {
    this.router.navigate(['booking-receipt', 'new']);
  }

  getbookingReciptsList(paymentId, bookingId, mappingId) {
    this.loader.createLoader();
    this.reciptsApi.getBookingRecipts(paymentId, bookingId, mappingId).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.bookingReceipts = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }

  editBookingRecipt(reciptId) {
    this.router.navigate(['booking-receipt', 'edit', reciptId]);
  }

  deleteBookingRecipt(reciptId) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        let req: any = {};
        req.bookingReceiptId = reciptId;
        req.refModifiedBy = 1;
        this.reciptsApi.deleteRecipt(reciptId, req).subscribe(success => {
          this.loader.dismissLoader();
          console.log('success', success);
          if (success[0].status == 3) {
            this.toaster.success(success[0].msg);
            this.ionViewWillEnter();
            return;
          }
          this.toaster.danger(success[0].msg);
        }, failure => {
          this.loader.dismissLoader();
          this.toaster.danger(failure[0].msg);
          console.log();
        });
      }
    });
  }


}
