import { Component, OnInit } from '@angular/core';
import { MyBookingsApiService } from '../services/api/my-bookings-api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {

  myBookings: any = [];
  transpoterId: number;
  constructor(private bookingApi: MyBookingsApiService,
    private ls: LocalStorageService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    this.getMyBookings(this.transpoterId, '');
  }
  getMyBookings(transpoterId, bookingId) {
    this.loader.createLoader();
    this.bookingApi.getMyBookings(transpoterId, bookingId).subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.myBookings = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  getBooking(bookingid) {
    this.router.navigate(['my-bookings', 'booking', bookingid]);
  }
}
