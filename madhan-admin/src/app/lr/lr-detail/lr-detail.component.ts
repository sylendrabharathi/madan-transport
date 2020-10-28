import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LrApiService } from '../service/api/lr-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-lr-detail',
  templateUrl: './lr-detail.component.html',
  styleUrls: ['./lr-detail.component.scss'],
})
export class LrDetailComponent implements OnInit {
  lrForm = this.fb.group({
    bookingId: [],
    lrNo: [[Validators.required]],
    totalQty: [[Validators.required]],
    material: [[Validators.required]],
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
    fright: ['']
  });
  editBookingId: number = -1;
  bookingIds: any = [];
  isEdit = false;
  editlr = false;
  editLrData: any = {};
  loadingCount: any = [];
  unLoadingCount: any = [];
  transpoterDetails: any = [];
  driverDetails: any = [];
  loadCharge: number = 0;
  fuelCharges: number = 0;
  advance: number = 0;
  bFright: number = 0;
  freight: number = 0;
  tPay: number = 0;
  balance: number = 0;
  bid: number = -1;
  constructor(private router: Router,
    private aRoute: ActivatedRoute,
    private lrApi: LrApiService,
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastService) { }

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
    this.loader.createLoader();
    this.lrApi.getLrDetails(lrId).subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.editLrData = success;
      this.loadLrdata(this.editLrData);
    }, failure => {
      this.loader.dismissLoader();
      console.log('failure', failure);
    });
    this.loader.dismissLoader();
  }
  loadBookingDropdown() {
    this.lrApi.getBookingNumbers().subscribe(success => {
      console.log('success', success);
      this.bookingIds = success;
    }, failure => { });
  }
  submit() {
    const bookingId = this.lrForm.get('bookingId').value;
    const lrValue = this.lrForm.get('lrNo').value;
    console.log(bookingId, lrValue);

    if (lrValue != null || lrValue != '') {
      const req = {
        'BookingId': bookingId,
        'Value': lrValue,
        'RefModifiedBy': 1

      }
      this.lrApi.editLrDetails(bookingId, req).subscribe(success => {
        console.log('suc', success);
        this.editlr = false;
        this.ionViewWillEnter();
      }, failure => {
        console.log('fa', failure);
        this.ionViewWillEnter();
      });
      // this.router.navigate(['lr']);
    }
  }
  loadLrdata(data) {
    console.log('data', data);
    this.loadingCount = data.polbmDtls;
    this.unLoadingCount = data.podbmDtls;
    this.transpoterDetails = data.vberDtls;
    this.driverDetails = data.dioDtls;
    if (data.bookingDtls[0].lrNo != null)
      this.editlr = true
    this.bid = data.bookingDtls[0].bookingId;
    this.lrForm.get('bookingId').setValue(data.bookingDtls[0].bookingId);
    this.lrForm.get('lrNo').setValue(data.bookingDtls[0].lrNo);
    this.lrForm.get('totalQty').setValue(data.bookingDtls[0].totalQty);
    this.lrForm.get('material').setValue(data.bookingDtls[0].material);
    this.lrForm.get('cpolbmCustomerName').setValue(data.polbmDtls[0].cpolbmCustomerName);
    this.lrForm.get('consignerName').setValue(data.podbmDtls[0].consignerName);
    this.lrForm.get('location').setValue(data.polbmDtls[0].location);
    this.lrForm.get('podLocation').setValue(data.podbmDtls[0].podLocation);
    this.lrForm.get('vbmRateAmount').setValue(data.vbmDtls[0].vbmRateAmount);
    this.calculateAmount(data.bpDtls);
    this.freight = data.bookingDtls[0].totalQty * data.vbmDtls[0].vbmRateAmount;
    this.tPay = this.freight + this.loadCharge;
    console.log(this.advance, this.tPay);
    this.balance = this.tPay - (this.bFright + this.advance);
    this.lrForm.updateValueAndValidity();
  }
  calculateAmount(data) {

    data.forEach(element => {
      if (element.rlbpppname == 'LoadingCharges') {
        this.loadCharge += Number(element.bpAmount);
      }
      else if (element.rlbpppname == 'Fuel') {
        this.fuelCharges += Number(element.bpAmount);
      }
      else if (element.rlbpppname == 'Advance') {
        this.advance += Number(element.bpAmount);
      }
      else if (element.rlbpppname == 'BalanceFright') {
        this.bFright += Number(element.bpAmount);
      }
    });
  }
  payment(bid) {
    console.log('bid', bid);
    if (bid > -1) {
      this.router.navigate(['booking-payments', 'lrEdit', bid])
    }
  }

}
