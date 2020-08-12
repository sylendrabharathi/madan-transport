import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RateApiService } from 'src/app/rate-card/Service/api/rate-api.service';
import { ReferenceApiService } from '../service/api/reference-api.service';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss'],
})
export class ReferenceListComponent implements OnInit {
  referenceDetails: any = [];
  referenceListDetails: any = [];
  viewChanger: any;
  constructor(private router: Router, private referenceApi: ReferenceApiService) { }

  ngOnInit() {
    // this.getDetails();
    this.getRefenceDeatils('');
  }
  // getDetails() {
  //   for (let i = 0; i < 15; i++) {
  //     const rate = {
  //       rateFor: 'Customer Rate',
  //       source: 'Chennai',
  //       destination: 'Mumbai',
  //       rate: '20,000',
  //       validity: new Date()
  //     };
  //     this.rateList.push(rate);
  //   }
  // }

  newReference() {
    this.router.navigate(['reference', 'new']);

  }
  ChangeView() {
    console.log('==>', this.viewChanger);
    if (this.viewChanger) {
      this.getRefenceListDeatils('');
    }
    else
      this.getRefenceDeatils('');
  }
  getRefenceDeatils(rateType) {
    this.referenceApi.getReferenceDetails(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.referenceDetails = success;
    },
      failure => {
        console.log('failure', failure);
      });

  }
  getRefenceListDeatils(rateType) {
    this.referenceApi.getReferenceListDetails(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.referenceListDetails = success;
    },
      failure => {
        console.log('failure', failure);
      });

  }

}
