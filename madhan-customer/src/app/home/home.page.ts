import { Component, OnInit } from '@angular/core';
import { HomeApiService } from './service/api/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  rates = [];

  constructor(
    private apiService: HomeApiService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getRates();
  }

  getRates() {
    this.apiService.getRates().subscribe((resp: any) => {
      console.log(resp);
      this.rates = resp || [];
    }, err => {

    });
  }


}
