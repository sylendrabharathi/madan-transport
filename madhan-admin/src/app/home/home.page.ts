import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  bookingDetails = [];
  constructor(private router: Router) {}

  ngOnInit(){
    this.getDetails();
  }

  getDetails() {
    for(let i = 0; i < 15; i++) {
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

  goToTruckDetail(bookingId) {
    this.router.navigate(['home', bookingId, 'truck-detail'])
  }

}
