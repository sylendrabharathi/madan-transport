import { Component, OnInit } from '@angular/core';
import { MyBookingsApiService } from '../services/api/my-bookings-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingId = 0;
  bookingDetails: any = [];
  transpoterId: number;
  constructor(private bookingApi: MyBookingsApiService,
    private aroute: ActivatedRoute,
    private ls: LocalStorageService,
    private route: Router,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    this.aroute.params.subscribe(data => {
      this.bookingId = data.bookingId;
    });
    this.getBookingDetails(this.transpoterId, this.bookingId);
  }
  getBookingDetails(transpoterId, bookingId) {
    this.loader.createLoader();
    this.bookingApi.getMyBookings(transpoterId, bookingId).subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.bookingDetails = success[0];
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      })
  }

}
