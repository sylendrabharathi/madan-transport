import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpApiService } from './service/api/sign-up-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    gstno: ['', [Validators.required,
    Validators.minLength(10)]],
    panno: ['', [Validators.required,
    Validators.minLength(10)]],
    lname: ['', [Validators.required]],
    address: ['', [Validators.required]],
    naddress: ['', [Validators.required]],
    etype: ['', [Validators.required]],
    rtype: ['', [Validators.required]],
    dtype: ['', [Validators.required]],
    regdate: ['', [Validators.required]],
    telno: ['', [Validators.required]],
    mobno: ['', [Validators.required]],
    email: ['', [Validators.required]],
    website: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    refReferenceListCityId: ['', [Validators.required]],
    refReferenceListStateId: ['', [Validators.required]],
    refReferenceListCountryId: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    address3: ['', [Validators.required]],
    address4: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    cnfpassword: ['', [Validators.required, Validators.minLength(7)]],
    RefOrgId: [],
    RefRoleId: [],
    RefCreatedBy: []

  });
  states: any = [];
  citys: any = [];
  countrys: any = [];
  gstDetails: any = [];
  constructor(private signUpApi: SignUpApiService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.loadIntialDetails();
  }
  submit() {

  }
  loadIntialDetails() {
    this.signUpApi.getReferceListDatas('state').subscribe(success => {
      this.states = success;
      console.log(success);
    }, failure => { });
    this.signUpApi.getReferceListDatas('city').subscribe(success => {
      this.citys = success;
    }, failure => { });
    this.signUpApi.getReferceListDatas('country').subscribe(success => {
      this.countrys = success;
    }, failure => { });
  }
  getDetailsFromGst() {
    const gstNo = this.registrationForm.get('gstno').value.trim();
    if (gstNo != '')
      console.log('gst-->', gstNo);
    this.signUpApi.getReferceListDatas(gstNo).subscribe(success => {
      console.log('success', success);
    }, failure => {
      console.log('failure', failure);
    });
  }

}
