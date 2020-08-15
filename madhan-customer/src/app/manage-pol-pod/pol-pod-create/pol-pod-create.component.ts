import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
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
  constructor(private fb:  FormBuilder, private apiService: ApiService, private polPodApi: PolPodApiService) { }

  ngOnInit() {
    this.createPolPodForm();
  }

  ionViewWillEnter(){
    this.getStates();
    this.getCountries();
    this.getCities();
    this.getPolPods();

  }

  createPolPodForm() {
    this.polPodForm = this.fb.group({
      regORGId: [3],
      refCustId: [null],
      refCreatedBy: [null],
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

  submit() {
    console.log('submit');
    
  }

  getPolPods() {
    this.polPodApi.getRefPolPods().subscribe((resp: any) => {
      console.log(resp);
      this.polPods = resp || [];
    }, err => {

    })
  }


}
