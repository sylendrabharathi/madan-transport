import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RateApiService } from '../Service/api/rate-api.service';

@Component({
  selector: 'app-rate-card-list',
  templateUrl: './rate-card-list.component.html',
  styleUrls: ['./rate-card-list.component.scss'],
})
export class RateCardListComponent implements OnInit {
  rateList: any = [];
  viewChanger: any;

  constructor(private router: Router,
    private rateApi: RateApiService) { }

  ngOnInit() {

    this.getRateList('CustomerRate');
  }

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
  ChangeView() {
    console.log('==>', this.viewChanger);
    if (this.viewChanger) {
      this.getRateList('TransporterRate');
    }
    else
      this.getRateList('CustomerRate');
  }
  getRateList(rateType) {
    this.rateApi.getRateList(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.rateList = success;
    },
      failure => {
        console.log('failure', failure);
      });

  }
  editRate(id) {
    this.router.navigate(['rate-card', id, 'edit'])
  }

}
