import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lr-list',
  templateUrl: './lr-list.component.html',
  styleUrls: ['./lr-list.component.scss'],
})
export class LrListComponent implements OnInit {
  lrList = [];
  constructor(private router: Router) { }


  ngOnInit() { this.getDetails(); }
  getDetails() {
    for (let i = 0; i < 15; i++) {
      const lr = {
        vnumber: 'Tn 00 XX 1234',
        tname: 'Ragavan',
        dname: 'Rajesh',
        source: 'Chennai',
        destination: 'Mumbai',
        quantity: '1000',
        bookingdate: new Date(),
        totalpay: 20000,
        balance: 10000
      };
      this.lrList.push(lr);
    }
  }

  newLr() {
    this.router.navigate(['lr', 'new']);

  }

}
