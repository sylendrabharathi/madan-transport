import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeApiService } from './service/api/home-api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  bookingDetails: any = [];
  constructor(private router: Router, private homeService: HomeApiService) { }

  ngOnInit() {
    // this.getDetails();
    this.getRequestedData();
  }

  getDetails() {
    for (let i = 0; i < 15; i++) {
      const booking = {
        id: 'Booking ' + (i + 1),
        company: 'Company - ' + (i + 1),
        source: 'Chennai',
        destination: 'Trichy',
        material: 'Printers',
        weight: '20 Ton',
        vehicleType: 'Truck',
        date: new Date()
      };
      this.bookingDetails.push(booking);
    }
  }

  goToTruckDetail(bookingId, source) {
    this.router.navigate(['home', bookingId, source, 'truck-detail'])
  }
  getRequestedData() {
    this.homeService.getICData().pipe().subscribe(success => {
      console.log('success', success);
      this.bookingDetails = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }

}
