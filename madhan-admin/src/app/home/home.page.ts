import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../service/Loader/loader.service';
import { HomeApiService } from './service/api/home-api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  bookingDetails: any = [];
  constructor(private router: Router,
    private homeService: HomeApiService,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getRequestedData();
  }

  goToTruckDetail(bookingId, source, polId) {
    this.router.navigate(['home', bookingId, polId, source, 'truck-detail'])
  }
  getRequestedData() {
    this.loader.createLoader();
    this.homeService.getICData().pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.bookingDetails = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }

}
