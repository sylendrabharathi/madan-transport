import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api/api.service';
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
  cities = [];
  states = [];
  countries = [];
  polPods = [];
  customerId = null;
  userId = null;
  polPodId = null;
  constructor(private fb: FormBuilder, 
    private apiService: ApiService, private polPodApi: PolPodApiService,
    private toast: ToastService,
    private ls: LocalstorageService,
    private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
    this.createPolPodForm();
  }

  ionViewWillEnter() {
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
    if (!this.polPodForm.valid) {
      this.toast.danger('Please fill all the fields');
      return;
    }

    console.log(this.polPodForm.value);
    const req: any = JSON.parse(JSON.stringify(this.polPodForm.value));
    req.refCustId = parseInt(req.refCustId);
    req.refCreatedBy = parseInt(req.refCreatedBy);
    if(!this.polPodForm.value.polPodId) {
      delete req['polPodId'];
      this.savePolPod(req);
      return;
    }
    
    

  }

  savePolPod(req) {
    this.polPodApi.savePolPod(req).subscribe((resp) => {
      console.log(resp);
      this
      this.router.navigate(['manage-pol-pod']);
    }, err => {
      console.log(err);
      
    })
  }

  getPolPods() {
    this.polPodApi.getRefPolPods().subscribe((resp: any) => {
      console.log(resp);
      this.polPods = resp || [];
    }, err => {

    })
  }


}
