import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PaymentModel } from 'src/app/models/PaymnetModel';
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
  reciptJson: PaymentModel;
  paymentForm = this.fb.group({
    vehicleBookingId: ['', [Validators.required]],
    paymentMode: ['', [Validators.required]],
    paymentPurpose: ['', [Validators.required]],
    paymentDate: ['', [Validators.required]],
    ammount: ['', [Validators.required]],
    description: ['']
  });

  constructor(private router: Router,
    private paymentApi: PaymentsApiService,
    private fb: FormBuilder,
    private toaster: ToastController) { }

  ngOnInit() {
    this.getVehicelBookings();
    this.getPaymentPurposes();
    this.getPaymentModes();
    this.reciptJson = new PaymentModel();
  }

  getVehicelBookings() {
    // for (let i = 0; i < 5; i++) {
    //   const obj = {
    //     vehicleBookingMappingId: i,
    //     polBookingMappingId: i,
    //     refBookingId: i,
    //     vehicleId: i,
    //     vehicleNo: `TN ${(i + 1) * 10} AA ${1111 * (i + 1)}`
    //   };
    //   this.vehicleBookings.push(obj);
    // }
    this.paymentApi.getVehicleId().pipe().subscribe(
      success => {
        console.log('success', success);
        this.vehicleBookings = success;
      },
      failure => {
        console.log('failure', failure);
      }
    );
  }

  getPaymentPurposes() {
    this.paymentApi.getPaymentPurpose().pipe().subscribe(
      success => {
        console.log('success', success);
        this.paymentPurposes = success;
      },
      failure => {
        console.log('failure', failure);
      }
    );

  }

  getPaymentModes() {
    this.paymentApi.getpaymentMode().pipe().subscribe(
      success => {
        console.log('success', success);
        this.paymentModes = success;
      },
      failure => {
        console.log('failure', failure);
      }
    );

  }

  async submit() {
    if (this.paymentForm.valid) {
      console.log('Rateform->', this.paymentForm.value);
      this.formRateJson(this.paymentForm.value);
      this.paymentApi.addPayment(this.reciptJson).pipe().subscribe(success => {
        console.log('success', success);
      },
        failure => {
          console.log('failure', failure);
        });
      this.paymentForm.reset();
      this.router.navigate(['booking-receipt']);
    }
    else {
      const toast = await this.toaster.create({
        header: 'Error',
        message: 'Enter all values',
        position: 'top',
        duration: 300,
        mode: 'ios',
        translucent: true
      });
      toast.present();
    }
  }
  formRateJson(data) {
    this.reciptJson.Amount = data.ammount;
    this.reciptJson.Description = data.description;
    this.reciptJson.RefReferenceListModeId = data.paymentMode;
    this.reciptJson.RefReferenceListPayPurposeId = data.paymentPurpose;
    this.reciptJson.RecipetDate = data.paymentDate;
    this.reciptJson.RefVehicleBookingMappingId = data.vehicleBookingId;

  }

}
