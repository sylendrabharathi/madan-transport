import { Component } from '@angular/core';
import { LoaderService } from '../services/Loader/loader.service';
import { HomeApiService } from './service/api/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transportRate: any = [];
  constructor(private homeApi: HomeApiService,
    private loader: LoaderService) { }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getHomeData();
  }
  getHomeData() {
    this.loader.createLoader();
    console.log('test');

    this.homeApi.getTransportRate().subscribe(success => {
      console.log('sucess', success);
      this.transportRate = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }

}
