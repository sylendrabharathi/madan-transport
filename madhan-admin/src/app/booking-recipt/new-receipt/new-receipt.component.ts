import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReciptsApiService } from '../service/api/recipts-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.scss'],
})
export class NewReceiptComponent implements OnInit {

  vehicleBookings: any = [];
  paymentPurposes: any = [];
  paymentModes: any = [];
  editReciptData: any = [];
  reciptForm = this.fb.group({
    refOrgId: [3],
    // RefCreatedBy = 1;
    refBookingId: ['', [Validators.required]],
    refReferenceListModeId: ['', [Validators.required]],
    refReferenceListPayPurposeId: ['', [Validators.required]],
    recipetDate: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    description: ['']
  });
  EditReciptId = -1;
  isEdit = false;
  constructor(private router: Router,
    private reciptApi: ReciptsApiService,
    private fb: FormBuilder,
    private toaster: ToastController,
    private acitveRoute: ActivatedRoute) { }

  ngOnInit() {
    //  this.reciptJson = new ReciptModel();
  }
  ionViewWillEnter() {
    this.getVehicelBookings();
    this.getPaymentPurposes();
    this.getPaymentModes();
    this.acitveRoute.params.subscribe(data => {
      this.EditReciptId = data.reciptId;
      if (this.EditReciptId > -1) {
        this.isEdit = true;
        this.getRecipt(this.EditReciptId);
      }
    });
  }

  getVehicelBookings() {
    this.reciptApi.getVehicleId().pipe().subscribe(
      success => {
        console.log('success', success);
        this.vehicleBookings = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }

  getPaymentPurposes() {
    this.reciptApi.getpaymentDetails('PaymentPurpose').pipe().subscribe(
      success => {
        console.log('success', success);
        this.paymentPurposes = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }

  getPaymentModes() {
    this.reciptApi.getpaymentDetails('PaymentMode').pipe().subscribe(
      success => {
        console.log('success', success);
        this.paymentModes = success;
      },
      failure => {
        console.log('failure', failure);
      }
    );

  }

  submit() {
    if (this.reciptForm.valid) {
      console.log('Rateform->', this.reciptForm.value);
      let req: any = this.reciptForm.value;
      // this.formRateJson(this.reciptForm.value);
      if (this.EditReciptId > -1) {
        this.EditRecipt(req);
        return;
      }
      this.saveRecipt(req);
    }
    else {
      this.Toaster('Fill all details', 'danger');
      this.reciptForm.markAllAsTouched();
      this.reciptForm.updateValueAndValidity();
    }
  }

  saveRecipt(req) {
    req.refCreatedBy = 1;
    this.reciptApi.addRecipt(req).pipe().subscribe(success => {
      console.log('success', success);
      if (success[0].status == 1) {
        this.Toaster(success[0].msg, 'success');
        this.reciptForm.reset();
        this.router.navigate(['booking-receipt']);
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
      });
  }

  EditRecipt(req) {
    req.isActive = this.editReciptData.isActive;
    req.bookingReceiptId = Number(this.EditReciptId);
    req.refModifiedBy = this.editReciptData.refModifiedBy;
    console.log('innn');

    this.reciptApi.editRecipt(this.EditReciptId, req).pipe().subscribe(success => {
      console.log('success', success);
      if (success[0].status == 2) {
        this.Toaster(success[0].msg, 'success');
        this.reciptForm.reset();
        this.router.navigate(['booking-receipt']);
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
      });
  }
  getRecipt(editId) {
    this.reciptApi.getRecipt(editId).subscribe(success => {
      console.log('success', success);
      this.editReciptData = success[0];
      this.setEditData();
    }, failure => {
      console.log('failure', failure);

    });
  }

  setEditData() {
    this.reciptForm.get('refBookingId').setValue(this.editReciptData.refBookingId);
    this.reciptForm.get('refReferenceListModeId').setValue(this.editReciptData.refReferenceListModeId);
    this.reciptForm.get('refReferenceListPayPurposeId').setValue(this.editReciptData.refReferenceListPayPurposeId);
    this.reciptForm.get('recipetDate').setValue(this.editReciptData.recipetDate);
    this.reciptForm.get('amount').setValue(this.editReciptData.amount);
    this.reciptForm.get('description').setValue(this.editReciptData.description);

  }

  async Toaster(message, color) {
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
  formRateJson(data) {

  }
}
