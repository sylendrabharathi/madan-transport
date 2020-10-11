import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { LrApiService } from '../service/api/lr-api.service';


@Component({
  selector: 'app-lr-list',
  templateUrl: './lr-list.component.html',
  styleUrls: ['./lr-list.component.scss'],
})
export class LrListComponent implements OnInit {
  lrList: any = [];
  constructor(private router: Router,
    private lrService: LrApiService,
    private loader: LoaderService) { }


  ngOnInit() { }

  ionViewWillEnter() {
    this.getLrList();
  }

  newLr() {
    this.router.navigate(['lr', 'new']);
  }
  getLrList() {
    this.loader.createLoader();
    this.lrService.getLrList().pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.lrList = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  edit(bookingId) {
    this.router.navigate(['lr', 'edit', bookingId])
  }

}
