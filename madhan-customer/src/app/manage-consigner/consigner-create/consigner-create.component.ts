import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { ConsignerApiService } from '../service/api/consigner-api.service';

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
  customerId = null;
  userId = null;
  consignerId = null;
  // consignerId = 

  constructor(private fb: FormBuilder,
    private apiService: ApiService, private ls: LocalstorageService,
    private consignerApiService: ConsignerApiService,
    private toastService: ToastService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
    this.createConsignerForm();
    this.activeRouter.params.subscribe(res => {
      console.log(res);
      if(res && res.id) {
        this.consignerId = res.id;
        console.log('pop');
        this.getConsigner();
      }
      
    })

  }

  ionViewWillEnter() {
    this.getStates();
    this.getCountries();
    this.getCities();

  }

  createConsignerForm() {
    this.consignerForm = this.fb.group({
      regORGId: [3],
      consignerId: [null],
      refCustId: [this.customerId],
      refCreatedBy: [this.userId],
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
    if (!this.consignerForm.valid) {
      this.toastService.danger('Please fille all fields');
      return;
    }
 
    const req = JSON.parse(JSON.stringify(this.consignerForm.value));
    req.phoneNo = req.phoneNo.toString();
    req.mobileNo = req.mobileNo.toString();
    req.refCustId = parseInt(req.refCustId);
    req.refCreatedBy = parseInt(req.refCreatedBy);
    delete req['consignerId'];

    this.consignerApiService.saveConsigner(req).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['manage-consigner']);
    }, err => {
      console.log(err);
      
    })

  }

  getConsigner() {
    this.consignerApiService.getConsigner(this.consignerId).subscribe((res) => {
      console.log(res);
      
    }, err => {
      console.log(err);
      
    })
  }

}
