import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageVehicleApiService } from '../services/api/manage-vehicle-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-vehicle-create',
  templateUrl: './manage-vehicle-create.component.html',
  styleUrls: ['./manage-vehicle-create.component.scss'],
  providers: [DatePipe]
})
export class ManageVehicleCreateComponent implements OnInit {
  transpoterId;
  // refCust: number;
  currentYear;
  maxyear;
  date;
  vehicleForm = this.fb.group({
    refReferenceListVehicleTypeid: ['', [Validators.required]],
    vehicleNo: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
    fcValidity: ['', [Validators.required]],
    fCDocument: ['C:/'],
    insurenceValidty: ['', [Validators.required]],
    insurenceDocument: ['C:/'],
    rCDocument: ['C:/'],
    description: ['',],
    refReferenceListCityId: ['', [Validators.required]],
    refReferenceListStateId: ['', [Validators.required]],
    refReferenceListCountryId: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    address3: [''],
    address4: ['', [Validators.required]],
    refOrgId: [3],
    refCustId: [],
  });
  vehicleEditId = -1;
  vehicleType: any = [];
  states: any = [];
  citys: any = [];
  countrys: any = [];
  failure = false;
  userId;
  vehicleEditData: any = [];
  constructor(private fb: FormBuilder,
    private vehicleApi: ManageVehicleApiService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toaster: ToastController,
    private datePipe: DatePipe) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(localStorage.getItem('customerId'));
    console.log('thissssss', this.transpoterId);

    this.userId = Number(localStorage.getItem('userId'));
    this.loadDates();
    this.loadIntialDetails();
    this.getParamData();
    if (this.vehicleEditId > -1) {
      this.loadEditDetails(this.transpoterId, this.vehicleEditId);
    }
  }
  loadDates() {
    this.date = new Date();
    this.currentYear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
    this.date.setFullYear(this.date.getFullYear() + 20);
    this.maxyear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();

  }

  loadIntialDetails() {
    this.vehicleApi.getByReferenceList('VehicleType').subscribe(success => {
      console.log(success);
      this.vehicleType = success;
    }, failure => { });
    this.vehicleApi.getByReferenceList('states').subscribe(success => {
      this.states = success;
      console.log(success);
    }, failure => { });
    this.vehicleApi.getByReferenceList('city').subscribe(success => {
      this.citys = success;
    }, failure => { });
    this.vehicleApi.getByReferenceList('country').subscribe(success => {
      this.countrys = success;
    }, failure => { });
  }
  getParamData() {
    this.aRoute.params.subscribe(data => {
      this.vehicleEditId = data.vehicleId;
      console.log('this.vehicleEditId', this.vehicleEditId);
    });
  }
  loadEditDetails(transpoterId, vehicleId) {
    this.vehicleApi.getVehicles(transpoterId, vehicleId).subscribe(
      success => {
        console.log('success', success[0]);
        this.vehicleEditData = success[0];
        this.setDataToForm(success[0]);
      },
      failure => {

      });
  }
  setDataToForm(data) {
    this.vehicleForm.get('refReferenceListVehicleTypeid').setValue(data.rlvtId);
    this.vehicleForm.get('vehicleNo').setValue(data.vvberVehicleNo);
    this.vehicleForm.get('fcValidity').setValue(data.fcvalidity);
    this.vehicleForm.get('insurenceValidty').setValue(data.insurenceValidty);
    this.vehicleForm.get('description').setValue(data.description);
    this.vehicleForm.get('refReferenceListCityId').setValue(data.vehiLocationCityId);
    this.vehicleForm.get('refReferenceListStateId').setValue(data.vehiLocationStateId);
    this.vehicleForm.get('refReferenceListCountryId').setValue(data.vehiLocationCountryId);
    this.vehicleForm.get('address1').setValue(data.vehiLocationAddress1);
    this.vehicleForm.get('address2').setValue(data.vehiLocationAddress2);
    this.vehicleForm.get('address3').setValue(data.vehiLocationAddress3);
    this.vehicleForm.get('address4').setValue(data.vehiLocationAddress4);
    this.vehicleForm.updateValueAndValidity();
  }
  async successToaster(message, color) {
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
  submit() {
    if (this.vehicleForm.valid) {
      this.vehicleForm.get('refCustId').setValue(this.transpoterId);
      if (this.vehicleEditId > -1) {
        this.editDetails(this.vehicleForm.value);
      }
      else {
        this.saveNewDetails(this.vehicleForm.value);
      }
    }
    else {
      // this.failure = true;
      this.successToaster('Fill all the required fields', 'danger');
    }
  }
  editDetails(data) {
    const req = data;
    req.VehicleId = Number(this.vehicleEditId);
    req.isActive = true;
    req.refModifiedBy = this.userId;
    console.log('req-->', req);
    this.vehicleApi.editVehicle(req, this.vehicleEditId).subscribe((success: any) => {
      console.log('success', success, 'success.status', success[0].status);
      if (success[0].status == 2) {
        this.successToaster(success[0].msg, 'success');
        this.router.navigate(['manage-vehicle']);
      }
    }, failure => { console.log('failure', failure); });
  }
  saveNewDetails(data) {
    const req = data;
    console.log('req', req);
    req.refCreatedBy = this.userId;
    this.vehicleApi.saveVehicle(req).subscribe((success: any) => {
      console.log('success', success);
      if (success[0].status == 1) {
        this.successToaster(success[0].msg, 'success');
        this.router.navigate(['manage-vehicle']);
      }

    }, failure => { console.log('failure', failure); });
  }
}
