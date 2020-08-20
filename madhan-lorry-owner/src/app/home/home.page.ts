import { Component } from '@angular/core';
import { HomeApiService } from './service/api/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transportRate: any = [];
  constructor(private homeApi: HomeApiService) { }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getHomeData();
  }
  getHomeData() {
    console.log('test');

    this.homeApi.getTransportRate().subscribe(success => {
      console.log('sucess', success);
      this.transportRate = success;

    },
      failure => {
        console.log('failure', failure);
      });
  }

}
