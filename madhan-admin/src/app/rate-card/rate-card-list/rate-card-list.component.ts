import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private toaster: ToastController) { }

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
    this.rateApi.getRateList(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.rateList = success;
    },
      failure => {
        console.log('failure', failure);
      });

  }
  editRate(id) {
    this.router.navigate(['rate-card', id, 'edit'])
  }
  deleteRate(rateId) {
    let req: any = {};
    req.rateId = rateId;
    req.RefModifiedBy = 1;
    this.rateApi.deleteRate(rateId, req).subscribe(success => {
      console.log('success', success);
      if (success[0].status == 3) {
        this.Toaster(success[0].msg, 'success');
        this.ionViewWillEnter();
        return;
      }
      this.Toaster(success[0].msg, 'success');
    },
      failure => {
        this.Toaster(failure[0].msg, 'success');
        console.log('failure', failure);
      });
  }

  async Toaster(message, color) {
    console.log('inside-->');
    let toast: any;

    toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: color,
      mode: "ios"
    });

    toast.present();
  }
}
