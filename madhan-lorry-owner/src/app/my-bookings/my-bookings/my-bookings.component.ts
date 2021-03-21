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
      this.formDataToShow(success);

    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  formDataToShow(data) {
    var length = data.bookingDtls.length;
    var info = [];
    for (var i = 0; i < length; i++) {
      var details = {
        bookingId: data.bookingDtls[i].bookingId,
        location: data.polbmDtls[i].location,
        podLocation: data.podbmDtls[i].podLocation,
        material: data.bookingDtls[i].material,
        totalQty: data.bookingDtls[i].totalQty,
        vvberVehicleNo: data.vberDtls.length > 0 ? data.vberDtls[i].vvberVehicleNo : '',
        driverName: data.dioDtls[i].driverName
      }
      info.push(details);
    }
    this.myBookings = info;
  }
  getBooking(bookingid) {
    this.router.navigate(['my-bookings', 'booking', bookingid]);
  }
}
