import { Component, OnInit } from '@angular/core';
import { MyBookinsApiService } from '../service/api/my-bookins-api.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {

  id :any = 0;
  myBookings = [];
  constructor(private api: MyBookinsApiService) { }

  ngOnInit() {
    this.id = localStorage.getItem('customerId');
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
