import { Component, OnInit } from '@angular/core';
import { MyBookingsApiService } from '../services/api/my-bookings-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingId = 0;
  bookingDetails: any = [];
  transpoterId;
  constructor(private bookingApi: MyBookingsApiService,
    private aroute: ActivatedRoute,
    private route: Router) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(localStorage.getItem('TranspoterId'));
    this.aroute.params.subscribe(data => {
      this.bookingId = data.bookingId;
    });
    this.getBookingDetails(this.transpoterId, this.bookingId);
  }
  getBookingDetails(transpoterId, bookingId) {
    this.bookingApi.getMyBookings(transpoterId, bookingId).subscribe(success => {
      console.log('success', success);
      this.bookingDetails = success[0];
    },
      failure => {
        console.log('failure', failure);
      })
  }

}
