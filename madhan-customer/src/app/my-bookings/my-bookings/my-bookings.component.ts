import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { MyBookinsApiService } from '../service/api/my-bookins-api.service';

export interface Booking {
  bookingId: number;
  material: string;
  vehicleType: string;
  totalQty: number;
  consignerName: string;
  location: string;
  podLocation: string;
  vvberVehicleNo: string;
  driverName: string;
  transporterMob: string;
  status: string;
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})

export class MyBookingsComponent implements OnInit {

  id: any = 0;
  myBookings: Booking[] = [];
  userBookings = [];
  constructor(private api: MyBookinsApiService,
    private router: Router,
    private alert: AlertServiceService,
    private loader: LoaderService) { }

  ngOnInit() {
    this.id = localStorage.getItem('customerId');
  }

  ionViewWillEnter() {
    this.getMyBookings();
  }

  getMyBookings() {
    this.loader.createLoader();
    this.api.getMyBookings(this.id).subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.userBookings = resp || [];
      this.formMyBookings(this.userBookings);
    }, err => {

    });
  }
  formMyBookings(data) {
    data.bookingDtls.forEach(element => {
      var myBooking: Booking = {} as any;
      // console.log('data', element);
      myBooking.bookingId = element.bookingId;
      myBooking.material = element.material;
      myBooking.vehicleType = element.vehicleType;
      myBooking.totalQty = element.totalQty;
      myBooking.status = element.status;
      var podDetails = data.podbmDtls.filter(x => myBooking.bookingId == x.bookingId);
      myBooking.consignerName = podDetails[0].consignerName;
      myBooking.podLocation = podDetails[0].podLocation;
      var driver = data.dioDtls.filter(x => myBooking.bookingId == x.bookingId);
      if (driver.length > 0)
        myBooking.driverName = driver[0].driverName;
      var transpoter = data.vberDtls.filter(x => myBooking.bookingId == x.bookingId);
      if (transpoter.length > 0) {
        myBooking.transporterMob = transpoter[0].transporterMob;
        myBooking.vvberVehicleNo = transpoter[0].vvberVehicleNo;
      }
      var polDetails = data.polbmDtls.filter(x => myBooking.bookingId == x.bookingId);
      myBooking.location = polDetails[0].location;
      this.myBookings.push(myBooking)
    });
  }
  editBooking(booking) {
    console.log(booking);
    // if (booking.status == 'IC')
    this.router.navigate(['new-booking', booking.bookingId, 'edit']);
    // else {
    // this.alert.noEditAlert('Alert', 'The booking has crossed IC status contact Adminstrator');
    // }
  }

  deleteBooking(booking) {
    // this.alert.alertPromt('Confirmation ', `Are you sure you want to delete? `).then(data => {
    //   if (Boolean(data)) {
    //     console.log(booking);
    //   }
    // });


  }

}
