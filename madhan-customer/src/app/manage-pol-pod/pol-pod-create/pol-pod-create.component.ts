import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api/api.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { PolPodApiService } from '../service/api/pol-pod-api.service';

@Component({
  selector: 'app-pol-pod-create',
  templateUrl: './pol-pod-create.component.html',
  styleUrls: ['./pol-pod-create.component.scss'],
})
export class PolPodCreateComponent implements OnInit {

  polPodForm: FormGroup;
  cities: any = [];
  states = [];
  countries = [];
  polPods = [];
  customerId = null;
  userId = null;
  polPodId = null;
  entryType: string;
  newBookingForm: any;

  constructor(private fb: FormBuilder,
    private apiService: ApiService, private polPodApi: PolPodApiService,
    private toast: ToastService,
    private ls: LocalstorageService,
    private router: Router,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService,
    private location: Location) { }

  ngOnInit() {
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
    this.createPolPodForm();
    this.activatedRoute.params.subscribe(res => {
      console.log('res = ', res);
      this.polPodId = res.id;
      this.entryType = res.type;
      console.log('this.entryType = ', this.entryType);
      if (this.entryType != null)
        this.newBookingForm = window.history.state.formVal;
      console.log('this.newBookingForm', this.newBookingForm, window.history.state);

      this.getPolPodById();
    });
  }

  ionViewWillEnter() {
    this.getRequiredDetails();
  }

  getRequiredDetails() {
    this.getStates();
    this.getCountries();
    this.getCities();
    this.getPolPods();

  }

  createPolPodForm() {
    this.polPodForm = this.fb.group({
      regOrgId: [3],
      polPodId: [this.polPodId, []],
      refCustId: [this.customerId],
      refCreatedBy: [this.userId],
      refReferenceListCityId: ['', [Validators.required]],
      refReferenceListStateId: ['', [Validators.required]],
      refReferenceListCountryId: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      address3: ['', [Validators.required]],
      address4: ['', [Validators.required]],
      location: ['', [Validators.required]],
      refReferenceListPolpodtypeId: ['', [Validators.required]]
    })
  }

  getCountries() {
    this.apiService.getCountries().subscribe((res: any) => {
      console.log(res);
      this.countries = res || [];
    }, err => {

    })
  }

  getStates() {
    this.apiService.getStates().subscribe((res: any) => {
      console.log(res);
      this.states = res || [];
    }, err => {

    })
  }

  getCities() {
    this.apiService.getCities().subscribe((res: any) => {
      console.log(res);
      this.cities = res || [];
    }, err => {

    })
  }

  async submit() {
    console.log('submit');
    // if (!this.polPodForm.valid) {
    //   this.toast.danger('Please fill all the fields');
    //   return;
    // }

    console.log(this.polPodForm.getRawValue());
    const req: any = JSON.parse(JSON.stringify(this.polPodForm.value));
    req.refCustId = parseInt(req.refCustId);
    req.refCreatedBy = parseInt(req.refCreatedBy);
    console.log(req);

    if (!this.polPodForm.value.polPodId) {
      delete req['polPodId'];
      this.savePolPod(req);
      return;
    }
    this.updatePolPod(req);
  }

  savePolPod(req) {
    // const id = 1;
    this.polPodApi.savePolPod(req).subscribe((resp) => {
      // this.newBookingForm[this.entryType] = resp.id;

      console.log(resp);
      if (this.entryType != null) {
        // this.location.back(); 
        this.router.navigate(['new-booking'], { state: { formVal: this.newBookingForm } })
        return;
      }
      this.router.navigate(['manage-pol-pod']);
    }, err => {
      console.log(err);

    })
  }

  updatePolPod(req) {
    this.polPodApi.updatePolPod(this.polPodId, req).subscribe((resp) => {
      this.router.navigate(['manage-pol-pod']);
    }, err => {
      console.log(err);
      if (err.status === 200) {
        this.router.navigate(['manage-pol-pod']);
      }

    })
  }

  getPolPods() {
    this.polPodApi.getRefPolPods().subscribe((resp: any) => {
      console.log(resp);
      this.polPods = resp || [];
    }, err => {

    })
  }

  getPolPodById() {
    this.getRequiredDetails();
    if (!!this.polPodId)
      this.polPodApi.getPolPodById(this.polPodId).subscribe((response: any[]) => {
        console.log(response);


        if (!(response && response[0])) {
          return;
        }
        const res = response[0];
        this.polPodForm.get('polPodId').setValue(res.polpodid);
        this.polPodForm.get('refReferenceListCityId').setValue(res.refReferenceListCityId);
        this.polPodForm.get('refReferenceListStateId').setValue(res.refReferenceListStateId);
        this.polPodForm.get('refReferenceListCountryId').setValue(res.refReferenceListCountryId);
        this.polPodForm.get('address1').setValue(res.address1);
        this.polPodForm.get('address2').setValue(res.address2);
        this.polPodForm.get('address3').setValue(res.address3);
        this.polPodForm.get('address4').setValue(res.address4);
        this.polPodForm.get('location').setValue(res.location);
        if (res.refReferenceListPolpodtypeId) {
          this.polPodForm.get('refReferenceListPolpodtypeId').setValue(res.refReferenceListPolpodtypeId);
        } else {
          for (const pp of this.polPods) {
            if (res.loadingType === pp.referenceListIdName) {
              console.log(pp.referenceListId);

              this.polPodForm.get('refReferenceListPolpodtypeId').setValue(pp.referenceListId);
              break;
            }

          }
        }
        this.polPodForm.updateValueAndValidity();

      }, err => {
        console.log(err);

      })
  }
  loadCity(data) {
    console.log('data', data);
    // this.loader.createLoader();
    this.polPodApi.getState(data.detail.value).subscribe(success => {
      // this.loader.dismissLoader();
      console.log(success);
      this.polPodApi.getCityBySate(success[0].name).subscribe(success => {
        console.log('success', success);
        this.cities = success;
      }, failure => {
        console.log('failur', failure);
      });

    }, failure => { })
    return;
  }

}
