import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LrApiService } from '../service/api/lr-api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lr-detail',
  templateUrl: './lr-detail.component.html',
  styleUrls: ['./lr-detail.component.scss'],
})
export class LrDetailComponent implements OnInit {
  lrForm = this.fb.group({
    bookingId: [[Validators.required]],
    lrNo: [[Validators.required]],
    totalQty: [[Validators.required]],
    rlmaterialId: [[Validators.required]],
    cpolbmCustomerName: ['', [Validators.required]],
    consignerName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    podLocation: ['', [Validators.required]],
    lpolAddress1: ['', [Validators.required]],
    lpolAddress2: ['', [Validators.required]],
    lpolAddress3: ['', [Validators.required]],
    lpolAddress4: ['', [Validators.required]],
    lpolCityId: [],
    lpolCityName: [],
    lpolStateId: [],
    lpolStateName: [],
    lpolCountryId: [],
    lpolCountryName: [],
    lpodAddress1: ['', [Validators.required]],
    lpodAddress2: ['', [Validators.required]],
    lpodAddress3: ['', [Validators.required]],
    lpodAddress4: ['', [Validators.required]],
    lpodCityId: [],
    lpodCityName: [],
    lpodStateId: [],
    lpodStateName: [],
    lpodCountryId: [],
    lpodCountryName: [],
    vvberVehicleNo: ['', [Validators.required]],
    transporterName: ['', [Validators.required]],
    transporterMob: ['', [Validators.required]],
    driverName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required]],
    licenceNo: ['', [Validators.required]],
    vbmRateAmount: [[Validators.required]],
    bpDescription: ['', [Validators.required]],
    rlbppmId: [[Validators.required]],
    rlbppmName: ['', [Validators.required]],
    driverId: [[Validators.required]],
  });
  editBookingId: number = -1;
  bookingIds: any = [];
  isEdit = false;
  constructor(private router: Router,
    private aRoute: ActivatedRoute,
    private lrApi: LrApiService,
    private fb: FormBuilder) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.aRoute.params.subscribe(data => {
      this.editBookingId = data.bookingId;
      if (this.editBookingId > -1) {
        this.getLrData(this.editBookingId);
        this.isEdit = true;
      }
    });
    this.loadBookingDropdown();
  }
  getLrData(lrId) {
    this.lrApi.getLrDetails(lrId).subscribe(success => {
      console.log('success', success);
    }, failure => {
      console.log('failure', failure);
    });
  }
  loadBookingDropdown() {
    this.lrApi.getBookingNumbers().subscribe(success => {
      console.log('success', success);
      this.bookingIds = success;
    }, failure => { });
  }
  submit() {
    this.router.navigate(['lr'])
  }


}
