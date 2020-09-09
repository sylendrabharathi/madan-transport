import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverInOutApiService } from '../services/api/driver-in-out-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-driver-in-out',
  templateUrl: './new-driver-in-out.component.html',
  styleUrls: ['./new-driver-in-out.component.scss'],
  providers: [DatePipe]
})
export class NewDriverInOutComponent implements OnInit {

  drivers: any = [];
  failure: boolean = false;
  vehicles: any = [];
  timeForm = this.fb.group({
    refDriverId: ['', [Validators.required]],
    refVehicleId: ['', [Validators.required]],
    inTime: ['', [Validators.required]],
    outTime: ['', [Validators.required]],
    refOrgId: [3],

  });
  driverInOutId = -1;
  transpoterId;
  driverData: any = [];
  currentYear;
  maxyear;
  date;
  constructor(private route: Router,
    private inOutApi: DriverInOutApiService,
    private fb: FormBuilder,
    private aroute: ActivatedRoute,
    private toaster: ToastController, private datePipe: DatePipe) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.transpoterId = Number(localStorage.getItem('TranspoterId'));
    this.getVehicleDetails(this.transpoterId);
    this.getDriverDetails(this.transpoterId);
    this.loadDates();
    this.aroute.params.subscribe(data => {
      this.driverInOutId = data['driverInOutId'];
    });
    if (this.driverInOutId > 0) {
      this.loadInOutData(this.driverInOutId);
    }

  }
  loadDates() {
    this.date = new Date('01' + '-' + '01' + '-' + new Date().getFullYear().toString());
    this.currentYear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
    this.date.setFullYear(this.date.getFullYear() + 20);
    this.maxyear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
  }
  getDriverDetails(transpoterId) {
    this.inOutApi.getDrivers(transpoterId).subscribe(
      success => {
        // console.log('success', success);
        this.drivers = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }
  getVehicleDetails(transpoterId) {
    this.inOutApi.getVehicles(transpoterId).subscribe(
      success => {
        // console.log('success', success);
        this.vehicles = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }
  loadInOutData(id) {
    this.inOutApi.getInOutDetail(id).subscribe(
      success => {
        // console.log(id, 'success', success);
        // this.drivers = success;
        this.driverData = success[0];
        this.setDataToForm(success[0]);
      },
      failure => {
        console.log('failure', failure);
      }
    );
  }
  setDataToForm(data) {
    this.timeForm.get('refDriverId').setValue(data.refDriverId);
    // console.log('data.refVehicleId', data.refVehicleId);
    this.timeForm.get('refVehicleId').setValue(data.refVehicleId);
    this.timeForm.get('inTime').setValue(data.inTime);
    this.timeForm.get('outTime').setValue(data.outTime);
    this.timeForm.updateValueAndValidity();
  }

  async successToaster(message) {
    console.log('inside-->');
    let toast: any;
    if (this.failure) {
      toast = await this.toaster.create({
        message: 'Fill all required fields.',
        duration: 2000,
        position: 'top',
        animated: true,
        color: "danger",
        mode: "ios"
      });
    }

    else {
      toast = await this.toaster.create({
        message: message,
        duration: 2000,
        position: 'top',
        animated: true,
        color: "success",
        mode: "ios"
      });
    }
    toast.present();
  }
  submit() {
    if (this.timeForm.valid) {
      if (this.driverInOutId > -1) {
        this.editDetails(this.timeForm.value);
      }
      else {
        this.saveNewDetails(this.timeForm.value);
      }
    }
    else {
      this.failure = true;
      this.successToaster('');
    }
  }
  editDetails(data) {
    const req = data;
    req.driverInOutId = Number(this.driverInOutId);
    req.isActive = this.driverData.isActive;
    req.refModifiedBy = this.transpoterId;
    console.log('req-->', req);
    this.inOutApi.editInOut(req, this.driverInOutId).subscribe((success: any) => {
      console.log('success', success, 'success.status', success.status);
      if (success[0].status == 2) {
        console.log('inside');

        this.successToaster(success[0].msg);
        this.route.navigate(['driver-in-out']);
      }

    }, failure => { console.log('failure', failure); });
  }
  saveNewDetails(data) {
    this.inOutApi.saveInOut(data).subscribe((success: any) => {
      const req = data;
      req.refrefCreatedBy = this.transpoterId;
      console.log('success', success);
      if (success[0].status == 1) {
        this.successToaster(success[0].msg);
        this.route.navigate(['driver-in-out']);
      }

    }, failure => { console.log('failure', failure); });
  }

}
