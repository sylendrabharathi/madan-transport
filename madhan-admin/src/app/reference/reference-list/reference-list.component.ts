import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RateApiService } from 'src/app/rate-card/Service/api/rate-api.service';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { ToastService } from 'src/app/service/toast/toast.service';
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
    private toaster: ToastService,
    private alert: AlertServiceService,
    private loader: LoaderService) { }

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
    this.loader.createLoader();
    this.referenceApi.getReferenceDetails(rateType).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.referenceDetails = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });

  }
  getRefenceListDeatils(rateType) {
    this.loader.createLoader();
    this.referenceApi.getReferenceListDetails(rateType).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.referenceListDetails = success;
    },
      failure => {
        this.loader.dismissLoader();
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
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        let req: any = {};
        req.referenceId = id;
        req.refModifiedBy = 1;
        this.referenceApi.deleteReference(id, req).subscribe(success => {
          this.loader.dismissLoader();
          // console.log('added success', success);
          if (success[0].status == 3) {
            this.toaster.success(success[0].msg);
            this.ionViewWillEnter();
            return;
          }
          this.toaster.danger(success[0].msg);
        },
          failure => {
            this.loader.dismissLoader();
            this.toaster.danger(failure[0].msg);
            console.log('failure', failure);
          });
      }
    });
  }
  deleteReferenceList(id) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        let req: any = {};
        req.referenceListId = id;
        req.refModifiedBy = 1;
        this.referenceApi.deleteReferenceList(id, req).subscribe(success => {
          this.loader.dismissLoader();
          // console.log('added success', success);
          if (success[0].status == 3) {
            this.toaster.success(success[0].msg);
            this.ionViewWillEnter();
            return;
          }
          this.toaster.danger(success[0].msg);
        },
          failure => {
            this.loader.dismissLoader();
            this.toaster.danger(failure[0].msg);
            console.log('failure', failure);
          });
      }
    });
  }
}
