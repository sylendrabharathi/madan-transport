import { Component, OnInit } from '@angular/core';
import { MyBookinsApiService } from '../service/api/my-bookins-api.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {

  id = 2;
  myBookings = [];
  constructor(private api: MyBookinsApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getMyBookings();
  }

  getMyBookings() {
    this.api.getMyBookings(this.id).subscribe((resp: any) => {
      console.log(resp);
      this.myBookings = resp || [];
    }, err => {

    })
  }

}
