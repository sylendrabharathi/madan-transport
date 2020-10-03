import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PaymentsApiService } from '../service/api/payments-api.service';

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

  constructor(private router: Router,
    private paymentApi: PaymentsApiService,
    private fb: FormBuilder,
    private toaster: ToastController,
    private activateRoute: ActivatedRoute) { }
  ngOnInit() { }

  ionViewWillEnter() {
    this.getVehicelBookings();
    this.getPaymentPurposes();
    this.getPaymentModes();
    this.activateRoute.params.subscribe(data => {
      console.log('param', data);
      this.editPaymentId = Number(data.paymentId);
      if (this.editPaymentId > -1) {
        this.isEdit = true;
        this.loadPaymentDatas(this.editPaymentId);
      }
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
      this.Toaster('Please Fill all the Mandatory fields', 'danger');
    }
  }
  savePaymentData(req) {
    req.refCreatedBy = 1;
    console.log('Rateform save->', req);
    this.paymentApi.addPayment(req).pipe().subscribe((success: any) => {
      console.log('success', success);
      if (success[0].status == 1) {
        this.Toaster(success[0].msg, "success");
        this.paymentForm.reset();
        this.router.navigate(['booking-payments']);
        return;
      }
      this.Toaster(success[0].msg, "danger");
    },
      failure => {
        console.log('failure', failure);
        this.Toaster(failure[0].msg, "danger");
      });

  }
  async Toaster(message, color) {
    console.log('inside-->');
    let toast: any;

    toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: color,
      mode: "ios"
    });

    toast.present();
  }

  loadPaymentDatas(id) {
    console.log('id', id);

    this.paymentApi.getBookignPaymentById(id).subscribe(success => {
      console.log('editData', success);
      this.editPaymentData = success[0];
      this.setEditData(this.editPaymentData);
    }, failure => {
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
    this.paymentApi.editBookingPayment(this.editPaymentId, req).subscribe((success: any) => {
      console.log('success', success);
      if (success[0].status == 2) {
        this.Toaster(success[0].msg, "success");
        this.Toaster("Data successfully updated", "success");
        this.paymentForm.reset();
        this.router.navigate(['booking-payments']);
        return;
      }
      this.Toaster(success[0].msg, "danger");
    },
      failure => {
        console.log('failure', failure);
        this.Toaster(failure[0].msg, "danger");
      });
  }

}
