import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { ToastService } from 'src/app/service/toast/toast.service';

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
    private rateApi: RateApiService,
    private toaster: ToastService,
    private alert: AlertServiceService,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getRateList('CustomerRate');
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
    this.loader.createLoader();
    this.rateApi.getRateList(rateType).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.rateList = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });

  }
  editRate(id) {
    this.router.navigate(['rate-card', id, 'edit'])
  }
  deleteRate(rateId) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        let req: any = {};
        req.rateId = rateId;
        req.RefModifiedBy = 1;
        this.rateApi.deleteRate(rateId, req).subscribe(success => {
          console.log('success', success);
          if (success[0].status == 3) {
            this.toaster.success(success[0].msg);
            this.ionViewWillEnter();
            return;
          }
          this.toaster.danger(success[0].msg);
        },
          failure => {
            this.toaster.danger(failure[0].msg);
            console.log('failure', failure);
          });
      }
    });
    this.loader.dismissLoader();

  }


}
