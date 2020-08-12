import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReciptsApiService } from '../service/api/recipts-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReciptModel } from 'src/app/models/ReciptModel';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.scss'],
})
export class NewReceiptComponent implements OnInit {

  vehicleBookings: any = [];
  paymentPurposes: any = [];
  paymentModes: any = [];
  reciptJson: ReciptModel;
  reciptForm = this.fb.group({
    vehicleBookingId: ['', [Validators.required]],
    paymentMode: ['', [Validators.required]],
    paymentPurpose: ['', [Validators.required]],
    paymentDate: ['', [Validators.required]],
    ammount: ['', [Validators.required]],
    description: ['']
  });

  constructor(private router: Router,
    private reciptApi: ReciptsApiService,
    private fb: FormBuilder,
    private toaster: ToastController) { }

  ngOnInit() {
    this.getVehicelBookings();
    this.getPaymentPurposes();
    this.getPaymentModes();
    this.reciptJson = new ReciptModel();
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
    this.reciptApi.getVehicleId().pipe().subscribe(
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
    this.reciptApi.getPaymentPurpose().pipe().subscribe(
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
    this.reciptApi.getpaymentMode().pipe().subscribe(
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
    if (this.reciptForm.valid) {
      console.log('Rateform->', this.reciptForm.value);
      this.formRateJson(this.reciptForm.value);
      this.reciptApi.addRecipt(this.reciptJson).pipe().subscribe(success => {
        console.log('success', success);
      },
        failure => {
          console.log('failure', failure);
        });
      this.reciptForm.reset();
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
    this.reciptJson.RefBookingId = data.vehicleBookingId;

  }
}
