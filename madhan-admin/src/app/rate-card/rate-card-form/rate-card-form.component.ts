import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RateApiService } from '../Service/api/rate-api.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RateCardModel } from 'src/app/models/RateCardModel';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rate-card-form',
  templateUrl: './rate-card-form.component.html',
  styleUrls: ['./rate-card-form.component.scss'],
})
export class RateCardFormComponent implements OnInit {

  rateForList: any = [];
  locationsList: any = [];
  ratejson: RateCardModel;
  newRateForm = this.fb.group({
    rateFor: ['', [Validators.required]],
    source: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    ammount: ['', Validators.required],
    validationDate: ['', [Validators.required]]
  });
  constructor(
    private router: Router,
    private rateApi: RateApiService,
    private fb: FormBuilder,
    private toaster: ToastController) { }

  ngOnInit() {
    this.getRateFor();
    this.getLocations();
    this.ratejson = new RateCardModel();
  }

  getRateFor() {
    this.rateApi.getRateFor().pipe().subscribe(success => {
      console.log('success', success);
      this.rateForList = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  getLocations() {
    this.rateApi.getLocations().pipe().subscribe(success => {
      console.log('success', success);
      this.locationsList = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  async submit() {
    if (this.newRateForm.valid) {
      console.log('Rateform->', this.newRateForm.value);
      if (this.newRateForm.value.source === this.newRateForm.value.destination) {
        const toast = await this.toaster.create({
          header: 'Warning',
          message: 'Source and Destination cannot be same',
          position: 'top',
          duration: 3000,
          mode: 'ios',
          translucent: true
        });
        toast.present();
        return;
      }
      this.formRateJson(this.newRateForm.value);
      this.rateApi.addRate(this.ratejson).pipe().subscribe(success => {
        console.log('success', success);
      },
        failure => {
          console.log('failure', failure);
        });
      this.router.navigate(['rate-card']);
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
    this.ratejson.RefRateForReferenceList = data.rateFor;
    this.ratejson.RefSourceReferenceList = data.source;
    this.ratejson.RefDestinationReferenceList = data.destination;
    this.ratejson.Amount = data.ammount;
    this.ratejson.ValidityDate = data.validationDate;
  }
}
