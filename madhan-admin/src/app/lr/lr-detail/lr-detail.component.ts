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
    consignerName: ['', [Validators.required]],
    vvberVehicleNo: ['', [Validators.required]],
    transporterName: ['', [Validators.required]],
    transporterMob: ['', [Validators.required]],
    vbmRateAmount: [[Validators.required]],
    bpDescription: ['', [Validators.required]],
    rlbppmId: [[Validators.required]],
    rlbppmName: ['', [Validators.required]],
    driverId: [[Validators.required]],
    driverName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required]],
    licenceNo: ['', [Validators.required]],
    location: ['', [Validators.required]],
    cpolbmCustomerName: ['', [Validators.required]],
    lpolAddress1: ['', [Validators.required]],
    podLocation: ['', [Validators.required]],


  });

  constructor(private router: Router,
    private aRoute: ActivatedRoute,
    private lrApi: LrApiService,
    private fb: FormBuilder) { }

  ngOnInit() { }
  submit() {
    this.router.navigate(['lr'])
  }


}
