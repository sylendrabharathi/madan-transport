import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-card-list',
  templateUrl: './rate-card-list.component.html',
  styleUrls: ['./rate-card-list.component.scss'],
})
export class RateCardListComponent implements OnInit {
  rateList = [];
  constructor(private router: Router) { }

  ngOnInit() { this.getDetails(); }
  getDetails() {
    for (let i = 0; i < 15; i++) {
      const rate = {
        rateFor: 'Customer Rate',
        source: 'Chennai',
        destination: 'Mumbai',
        rate: '20,000',
        validity: new Date()
      };
      this.rateList.push(rate);
    }
  }

  newRate() {
    this.router.navigate(['rate-card', 'new']);

  }


}
