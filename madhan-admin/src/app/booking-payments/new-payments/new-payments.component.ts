import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';
import { PaymentsApiService } from '../service/api/payments-api.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.scss'],
})
export class NewPaymentsComponent implements OnInit {

  vehicleBookings: any = [];
  paymentPurposes: any = [];
  paymentModes: any = [];
  editPaymentId: number = -1;
  bid: number = -1;
  isEdit = false;
  paymentForm = this.fb.group({
    refVehicleBookingMappingId: ['', [Validators.required]],
    refReferenceListModeId: ['', [Validators.required]],
    refReferenceListPayPurposeId: ['', [Validators.required]],
    paymentDate: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    description: [''],
    refOrgId: 3,

  });
  editPaymentData: any = [];
  // @ViewChild('back', null) back: ElementRef;

  constructor(private router: Router,
    private paymentApi: PaymentsApiService,
    private fb: FormBuilder,
    private toaster: ToastService,
    private activateRoute: ActivatedRoute,
    private loader: LoaderService,
    private platform: Platform) { }
  ngOnInit() { }

  ionViewWillEnter() {
    this.getVehicelBookings();
    this.getPaymentPurposes();
    this.getPaymentModes();
    this.activateRoute.params.subscribe(data => {
      console.log('param', data);
      this.editPaymentId = Number(data.paymentId);
      this.bid = Number(data.bid);
      if (this.editPaymentId > -1) {
        this.isEdit = true;
        this.loadPaymentDatas(this.editPaymentId);
      }
      else if (this.bid > -1) {
        this.getVehicleByBookingId(this.bid);
      }
    });
  }

  getVehicleByBookingId(bid) {
    this.paymentApi.getVehicleIdByBookingId(bid).pipe().subscribe(
      success => {
        console.log('bidsuccess', success);
        this.paymentForm.get('refVehicleBookingMappingId').setValue(success[0].vehicleBookingMappingId);
      },
      failure => {
        console.log('failure', failure);
      });
  }
  getVehicelBookings() {
    this.paymentApi.getVehicleId().pipe().subscribe(
      success => {
        console.log('success', success);
        this.vehicleBookings = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }

  getPaymentPurposes() {
    this.paymentApi.getRefernceListData('PaymentPurpose').pipe().subscribe(
      success => {
        console.log('success', success);
        this.paymentPurposes = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }

  getPaymentModes() {
    this.paymentApi.getRefernceListData('PaymentMode').pipe().subscribe(
      success => {
        console.log('success', success);
        this.paymentModes = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }
  submit() {
    if (this.paymentForm.valid) {
      console.log('Rateform->', this.paymentForm.value);
      let req = this.paymentForm.value;
      if (this.editPaymentId > -1) {
        this.edit(req);
        return;
      }
      this.savePaymentData(req);
    }
    else {
      this.paymentForm.markAllAsTouched();
      this.paymentForm.updateValueAndValidity();
      this.toaster.danger('Please Fill all the Mandatory fields');
    }
  }
  savePaymentData(req) {

    req.refCreatedBy = 1;
    console.log('Rateform save->', req);
    this.loader.createLoader();
    this.paymentApi.addPayment(req).pipe().subscribe((success: any) => {
      this.loader.dismissLoader();
      console.log('success', success);
      if (success[0].status == 1) {
        this.toaster.success(success[0].msg);
        this.paymentForm.reset();
        if (this.bid > -1) {
          document.getElementById('back').click();
          return;
        }
        this.router.navigate(['booking-payments']);
        return;
      }
      this.toaster.danger(success[0].msg);
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
        this.toaster.danger(failure[0].msg);
      });

  }


  loadPaymentDatas(id) {
    console.log('id', id);
    this.loader.createLoader();
    this.paymentApi.getBookignPaymentById(id).subscribe(success => {
      this.loader.dismissLoader();
      console.log('editData', success);
      this.editPaymentData = success[0];
      this.setEditData(this.editPaymentData);
    }, failure => {
      this.loader.dismissLoader();
      console.log('ediutdatafail', failure);
    });
  }
  setEditData(data) {
    this.paymentForm.get('refVehicleBookingMappingId').setValue(this.editPaymentData.refVehicleBookingMappingId);
    this.paymentForm.get('refReferenceListModeId').setValue(this.editPaymentData.refReferenceListModeId);
    this.paymentForm.get('refReferenceListPayPurposeId').setValue(this.editPaymentData.refReferenceListPayPurposeId);
    this.paymentForm.get('paymentDate').setValue(this.editPaymentData.paymentDate);
    this.paymentForm.get('amount').setValue(this.editPaymentData.amount);
    this.paymentForm.get('description').setValue(this.editPaymentData.description);

  }
  edit(req) {
    req.bookingPaymentsId = this.editPaymentId;
    req.isActive = this.editPaymentData.isActive;
    req.refModifiedBy = 1;
    console.log('Rateform save->', req);
    this.loader.createLoader();
    this.paymentApi.editBookingPayment(this.editPaymentId, req).subscribe((success: any) => {
      this.loader.dismissLoader();
      console.log('success', success);
      if (success[0].status == 2) {
        this.toaster.success(success[0].msg);
        this.paymentForm.reset();
        this.router.navigate(['booking-payments']);
        return;
      }
      this.toaster.danger(success[0].msg);
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
        this.toaster.danger(failure[0].msg);
      });
  }

}
