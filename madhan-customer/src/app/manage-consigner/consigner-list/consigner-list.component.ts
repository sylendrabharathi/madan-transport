import { Component, OnInit } from '@angular/core';
import { ConsignerApiService } from '../service/api/consigner-api.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';

@Component({
  selector: 'app-consigner-list',
  templateUrl: './consigner-list.component.html',
  styleUrls: ['./consigner-list.component.scss'],
})
export class ConsignerListComponent implements OnInit {

  customerId = null;
  userId = null;
  consigners = [];
  constructor(private api: ConsignerApiService,
    private router: Router,
    private ls: LocalstorageService,
    private loader: LoaderService,
    private alert: AlertServiceService) { }

  ngOnInit() {
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
  }

  ionViewWillEnter() {
    this.getConsigners();
  }

  getConsigners() {
    this.loader.createLoader();
    this.api.getConsigners(this.customerId).subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.consigners = resp || [];
    }, err => {

    })
  }

  createNewConsigner() {
    this.router.navigate(['manage-consigner', 'new']);
  }

  editConsigner(consigner) {
    console.log(consigner);
    this.router.navigate(['manage-consigner', consigner.consignerId, 'edit']);
  }

  deleteConsigner(consigner) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        console.log(consigner);

      }
    });
  }

}
