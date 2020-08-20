import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LrApiService } from '../service/api/lr-api.service';


@Component({
  selector: 'app-lr-list',
  templateUrl: './lr-list.component.html',
  styleUrls: ['./lr-list.component.scss'],
})
export class LrListComponent implements OnInit {
  lrList: any = [];
  constructor(private router: Router, private lrService: LrApiService) { }


  ngOnInit() {
    // this.getDetails();
    this.getLrList();
  }
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
  getLrList() {
    this.lrService.getLrList().pipe().subscribe(success => {
      console.log('success', success);
      this.lrList = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  calculateBalance(total, advance = 0) {
    return total - advance;
  }
  calculateTotal(qty, ratePerTon = 1, lodingCharges = 100) {
    return (qty * ratePerTon) + lodingCharges;
  }
}
