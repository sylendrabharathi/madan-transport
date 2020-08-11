import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss'],
})
export class DetailsListComponent implements OnInit {

  detailsList = [];

  constructor() { }

  ngOnInit() {
    this.getDetailsList();
  }

  getDetailsList() {
    for (let i = 0; i < 15; i++) {
      const detail = {
        id: 'Book' + (i + 1),
        customer: 'HP Printers',
        transporterName: 'Suresh',
        vehicleNo: 'TN 46 B 8888',
        location: 'Chennai',
        mobileNo: '9632587410',
        vehicleType: 'container'
      };
      this.detailsList.push(detail);
    }
  }
}
