import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-consigner-create',
  templateUrl: './consigner-create.component.html',
  styleUrls: ['./consigner-create.component.scss'],
})
export class ConsignerCreateComponent implements OnInit {

  consignerForm: FormGroup;
  cities = [];
  states = [];
  countries = [];

  constructor(private fb:  FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.createConsignerForm();
  }

  ionViewWillEnter() {
    this.getStates();
    this.getCountries();
    this.getCities();

  }

  createConsignerForm() {
    this.consignerForm = this.fb.group({
      regORGId: [3],
      refCustId: [null],
      refCreatedBy: [null],
      name: ['', [Validators.required]],
      gstno: ['', [Validators.required]],
      pannumber: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]],
      description: ['', [Validators.required]],
      refReferenceListCityId: ['', [Validators.required]],
      refReferenceListStateId: ['', [Validators.required]],
      refReferenceListCountryId: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      address3: ['', [Validators.required]],
      address4: ['', [Validators.required]],
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

}
