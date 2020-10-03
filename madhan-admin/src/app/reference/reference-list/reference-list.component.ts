import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RateApiService } from 'src/app/rate-card/Service/api/rate-api.service';
import { ReferenceApiService } from '../service/api/reference-api.service';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss'],
})
export class ReferenceListComponent implements OnInit {
  referenceDetails: any = [];
  referenceListDetails: any = [];
  viewChanger: any;
  constructor(private router: Router,
    private referenceApi: ReferenceApiService,
    private toaster: ToastController) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getRefenceDeatils('');
  }

  newReference() {
    this.router.navigate(['reference', 'new']);

  }
  ChangeView() {
    console.log('==>', this.viewChanger);
    if (this.viewChanger) {
      this.getRefenceListDeatils('');
    }
    else
      this.getRefenceDeatils('');
  }
  getRefenceDeatils(rateType) {
    this.referenceApi.getReferenceDetails(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.referenceDetails = success;
    },
      failure => {
        console.log('failure', failure);
      });

  }
  getRefenceListDeatils(rateType) {
    this.referenceApi.getReferenceListDetails(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.referenceListDetails = success;
    },
      failure => {
        console.log('failure', failure);
      });

  }
  edit(id) {
    if (!this.viewChanger) {
      this.router.navigate(['reference', id, 'Referece', 'edit']);
    }
    else {
      this.router.navigate(['reference', id, 'RefereceList', 'edit']);
    }
  }
  deleteReference(id) {
    let req: any = {};
    req.referenceId = id;
    req.refModifiedBy = 1;
    this.referenceApi.deleteReference(id, req).subscribe(success => {
      // console.log('added success', success);
      if (success[0].status == 3) {
        this.Toaster(success[0].msg, 'success');
        this.ionViewWillEnter();
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
      });
  }
  deleteReferenceList(id) {
    let req: any = {};
    req.referenceListId = id;
    req.refModifiedBy = 1;
    this.referenceApi.deleteReferenceList(id, req).subscribe(success => {
      // console.log('added success', success);
      if (success[0].status == 3) {
        this.Toaster(success[0].msg, 'success');
        this.ionViewWillEnter();
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
      });
  }

  async Toaster(message, color) {
    console.log('inside-->');
    let toast = await this.toaster.create({
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
