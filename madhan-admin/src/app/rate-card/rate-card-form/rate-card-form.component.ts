import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RateApiService } from '../Service/api/rate-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast/toast.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';

@Component({
  selector: 'app-rate-card-form',
  templateUrl: './rate-card-form.component.html',
  styleUrls: ['./rate-card-form.component.scss'],
})
export class RateCardFormComponent implements OnInit {

  rateForList: any = [];
  locationsList: any = [];
  sub: any;
  editRateId: number = -1;
  isEdit = false;
  newRateForm = this.fb.group({
    refOrgid: [3],
    refRateForReferenceList: ['', [Validators.required]],
    refSourceReferenceList: ['', [Validators.required]],
    refDestinationReferenceList: ['', [Validators.required]],
    amount: ['', Validators.required],
    ValidityDate: ['', [Validators.required]]
  });
  editRateData: any = {};
  constructor(
    private router: Router,
    private rateApi: RateApiService,
    private fb: FormBuilder,
    private toaster: ToastService,
    private aRouter: ActivatedRoute,
    private loader: LoaderService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getRateFor();
    this.getLocations();
    this.sub = this.aRouter.params.subscribe(
      param => { this.editRateId = Number(param['id']); });
    if (this.editRateId > -1) {
      this.isEdit = true;
      this.getRateAgainstId(this.editRateId);
    }
  }

  getRateAgainstId(id) {
    this.loader.createLoader();
    this.rateApi.getRateById(id).subscribe(
      (success: any) => {
        this.loader.dismissLoader();
        this.editRateData = success[0];
        this.setDataForEdit(success[0]);
      },
      failure => {
        this.loader.dismissLoader();
        this.toaster.danger(failure[0].msg);
      });
  }

  setDataForEdit(data) {
    this.newRateForm.get('refRateForReferenceList').setValue(data.refRateForReferenceList);
    this.newRateForm.get('refSourceReferenceList').setValue(data.refSourceReferenceList);
    this.newRateForm.get('refDestinationReferenceList').setValue(data.refDestinationReferenceList);
    this.newRateForm.get('amount').setValue(data.amount);
    this.newRateForm.get('ValidityDate').setValue(data.validityDate);
    this.newRateForm.updateValueAndValidity();
  }

  getRateFor() {
    this.rateApi.getFromRefernceList('rate').pipe().subscribe(
      success => { this.rateForList = success; },
      failure => { console.log('failure', failure); });
  }
  getLocations() {
    this.rateApi.getFromRefernceList('LodingPoints').pipe().subscribe(
      success => { this.locationsList = success; },
      failure => { console.log('failure', failure); });
  }
  submit() {
    if (this.newRateForm.valid) {
      let req = this.newRateForm.value;
      console.log('Rateform->', this.newRateForm.value);
      if (this.newRateForm.value.refSourceReferenceList === this.newRateForm.value.refDestinationReferenceList) {
        this.toaster.danger('Source and Destination cannot be same');
        return;
      }
      if (this.editRateId > -1) {
        this.editRate(req);
        return;
      }
      this.saveRate(req);
      return;
    }
    else {
      this.toaster.danger('Fill all details');
    }
  }

  saveRate(req) {
    this.loader.createLoader();
    req.refCreatedBy = 1;
    this.rateApi.addRate(req).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      if (success[0].status == 1) {
        this.toaster.success(success[0].msg);
        this.newRateForm.reset();
        this.router.navigate(['rate-card']);
      }
    },
      failure => {
        this.loader.dismissLoader();
        this.toaster.danger(failure[0].msg);
        console.log('failure', failure);
      });
  }
  editRate(req) {
    this.loader.createLoader();
    req.rateId = this.editRateData.rateId;
    req.isActive = this.editRateData.isActive;
    req.refModifiedBy = this.editRateData.refModifiedBy;
    this.rateApi.editRate(this.editRateId, req).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      if (success[0].status == 2) {
        this.toaster.success(success[0].msg);
        this.newRateForm.reset();
        this.router.navigate(['rate-card']);
      }
    },
      failure => {
        this.loader.dismissLoader();
        this.toaster.danger(failure[0].msg);
        console.log('failure', failure);
      });
  }

}
