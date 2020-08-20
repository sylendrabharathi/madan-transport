import { Component, OnInit } from '@angular/core';
import { BookingEnquiresApiService } from '../services/api/booking-enquires-api.service';

@Component({
  selector: 'app-booking-enquires',
  templateUrl: './booking-enquires.component.html',
  styleUrls: ['./booking-enquires.component.scss'],
})
export class BookingEnquiresComponent implements OnInit {
  bookingEnquires: any = [];
  constructor(private benqApi: BookingEnquiresApiService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getEnqData(4);
  }
  getEnqData(ownerId) {
    this.benqApi.getAllBookingEnq(ownerId).subscribe(success => {
      console.log('success', success);
      this.bookingEnquires = success;
    },
      failure => {
        console.log('failure', failure);

      });
  }


}
