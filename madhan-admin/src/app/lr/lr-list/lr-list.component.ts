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


  ngOnInit() { }

  ionViewWillEnter() {
    this.getLrList();
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
  edit(bookingId) {
    this.router.navigate(['lr', 'edit', bookingId])
  }

}
