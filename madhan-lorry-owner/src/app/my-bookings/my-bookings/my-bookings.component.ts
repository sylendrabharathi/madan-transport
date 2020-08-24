import { Component, OnInit } from '@angular/core';
import { MyBookingsApiService } from '../services/api/my-bookings-api.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {

  myBookings: any = [];
  constructor(private bookingApi: MyBookingsApiService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getMyBookings('');
  }
  getMyBookings(transpoterId) {
    this.bookingApi.getMyBookings(transpoterId).subscribe(success => {
      console.log('success', success);
      this.myBookings = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }

}
