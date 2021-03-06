import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
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
  cities: any = [];
  states = [];
  countries = [];
  customerId = null;
  userId = null;
  consignerId = null;
  selectedStateId: number;
  // consignerId = 

  constructor(private fb: FormBuilder,
    private apiService: ApiService, private ls: LocalstorageService,
    private consignerApiService: ConsignerApiService,
    private toastService: ToastService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private loader: LoaderService) { }

  ngOnInit() {
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
    this.createConsignerForm();
    

  }

  ionViewWillEnter() {
    this.getRequiredDetails();
    this.activeRouter.params.subscribe(res => {
      console.log(res);
      if (res && res.id) {
        this.consignerId = res.id;
        console.log('pop');
        this.getConsigner();
        // this.getRequiredDetails();
      }

    })
  }

  getRequiredDetails() {
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
    this.consignerForm.get('refReferenceListStateId').setValue(this.selectedStateId);

    if (!this.consignerForm.valid) {
      this.toastService.danger('Please fille all fields');
      return;
    }

    const req = JSON.parse(JSON.stringify(this.consignerForm.value));
    req.phoneNo = req.phoneNo.toString();
    req.mobileNo = req.mobileNo.toString();
    req.refCustId = parseInt(req.refCustId);
    req.refCreatedBy = parseInt(req.refCreatedBy);

    if (req.consignerId) {
      this.update(req);
      return;
    }
    this.save(req);

  }

  save(req) {
    delete req['consignerId'];
    this.loader.createLoader();
    this.consignerApiService.saveConsigner(req).subscribe((resp) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.router.navigate(['manage-consigner']);
    }, err => {
      console.log(err);

    });

  }

  update(req) {
    this.loader.createLoader();
    this.consignerApiService.updateConsigner(req, req.consignerId).subscribe((resp) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.router.navigate(['manage-consigner']);
    }, err => {
      console.log(err);

    });

  }


  getConsigner() {
    this.getRequiredDetails();
    this.loader.createLoader();
    this.consignerApiService.getConsigner(this.consignerId, this.customerId).subscribe((res) => {
      this.loader.dismissLoader();
      console.log(res);
      if (res && res[0]) {
        this.consignerForm.get('consignerId').setValue(res[0].consignerId);
        this.consignerForm.get('name').setValue(res[0].name);
        this.consignerForm.get('gstno').setValue(res[0].gstno);
        this.consignerForm.get('pannumber').setValue(res[0].pannumber);
        this.consignerForm.get('phoneNo').setValue(res[0].phoneNo);
        this.consignerForm.get('mobileNo').setValue(res[0].mobileNo);
        this.consignerForm.get('email').setValue(res[0].email);
        this.consignerForm.get('website').setValue(res[0].website);
        this.consignerForm.get('description').setValue(res[0].description);
        this.consignerForm.get('refReferenceListCityId').setValue(res[0].refReferenceListCityId);

        this.consignerForm.get('refReferenceListStateId').setValue(res[0].refReferenceListStateId);
        this.consignerForm.get('refReferenceListCountryId').setValue(res[0].refReferenceListCountryId);
        this.consignerForm.get('address1').setValue(res[0].address1);
        this.consignerForm.get('address2').setValue(res[0].address2);
        this.consignerForm.get('address3').setValue(res[0].address3);
        this.consignerForm.get('address4').setValue(res[0].address4);

      }
    }, err => {
      console.log(err);

    });
  }
  loadCity(data) {
    console.log('data', data);
    this.loader.createLoader();
    this.consignerApiService.getState(data.detail.value).subscribe(success => {
      this.loader.dismissLoader();
      console.log(success);
      this.consignerApiService.getCityBySate(success[0].name).subscribe(success => {
        console.log('success', success);
        this.cities = success;
      }, failure => {
        console.log('failur', failure);
      });

    }, failure => { })
    return;
  }
}
