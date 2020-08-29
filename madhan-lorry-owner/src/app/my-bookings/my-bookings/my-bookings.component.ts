import { Component, OnInit } from '@angular/core';
import { MyBookingsApiService } from '../services/api/my-bookings-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {

  myBookings: any = [];
  constructor(private bookingApi: MyBookingsApiService,
    private router: Router) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getMyBookings(4, '');
  }
  getMyBookings(transpoterId, bookingId) {
    this.bookingApi.getMyBookings(transpoterId, bookingId).subscribe(success => {
      console.log('success', success);
      this.myBookings = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  getBooking(bookingid) {
    this.router.navigate(['my-bookings', 'booking', bookingid]);
  }
}
