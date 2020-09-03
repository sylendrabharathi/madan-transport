import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageVehicleApiService } from '../services/api/manage-vehicle-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-vehicle-create',
  templateUrl: './manage-vehicle-create.component.html',
  styleUrls: ['./manage-vehicle-create.component.scss'],
})
export class ManageVehicleCreateComponent implements OnInit {
  vehicleForm = this.fb.group({
    vType: ['', [Validators.required]],
    vNo: ['', [Validators.required]],
    fcValidity: ['', [Validators.required]],
    iValidity: ['', [Validators.required]],
    description: ['',],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    flatNo: ['', [Validators.required]],
    addressL1: ['', [Validators.required]],
    addressL2: ['', [Validators.required]],
    landMark: ['', [Validators.required]]
  });
  vehicleEditId = 0;
  vehicleType: any = [];
  states: any = [];
  citys: any = [];
  countrys: any = [];
  transpoterId = 4;
  constructor(private fb: FormBuilder,
    private vehicleApi: ManageVehicleApiService,
    private aRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.loadIntialDetails();
    this.getParamData();
    if (this.vehicleEditId != 0) {
      this.loadEditDetails(this.transpoterId, this.vehicleEditId);
    }
  }

  loadIntialDetails() {
    this.vehicleApi.getByReferenceList('VehicleType').subscribe(success => {
      console.log(success);
      this.vehicleType = success;
    }, failure => { });
    this.vehicleApi.getByReferenceList('state').subscribe(success => {
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
        this.setDataToForm(success[0]);
      },
      failure => {

      });
  }
  setDataToForm(data) {
    this.vehicleForm.get('vType').setValue(data.rlvtId);
    this.vehicleForm.get('vNo').setValue(data.vvberVehicleNo);
    this.vehicleForm.get('fcValidity').setValue(data.fcvalidity);
    this.vehicleForm.get('iValidity').setValue(data.insurenceValidty);
    this.vehicleForm.get('description').setValue(data.description);
    this.vehicleForm.get('city').setValue(data.vehiLocationCityId);
    this.vehicleForm.get('state').setValue(data.vehiLocationStateId);
    this.vehicleForm.get('country').setValue(data.vehiLocationCountryId);
    this.vehicleForm.get('flatNo').setValue(data.vehiLocationAddress1);
    this.vehicleForm.get('addressL1').setValue(data.vehiLocationAddress2);
    this.vehicleForm.get('addressL2').setValue(data.vehiLocationAddress3);
    this.vehicleForm.get('landMark').setValue(data.vehiLocationAddress4);
    this.vehicleForm.updateValueAndValidity();
  }
}
