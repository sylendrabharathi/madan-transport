import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverInOutApiService } from '../services/api/driver-in-out-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-driver-in-out',
  templateUrl: './new-driver-in-out.component.html',
  styleUrls: ['./new-driver-in-out.component.scss'],
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
  transpoterId = 4;
  driverData: any = [];
  constructor(private route: Router,
    private inOutApi: DriverInOutApiService,
    private fb: FormBuilder,
    private aroute: ActivatedRoute,
    private toaster: ToastController) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getVehicleDetails(this.transpoterId);
    this.getDriverDetails(this.transpoterId);
    this.aroute.params.subscribe(data => {
      this.driverInOutId = data['driverInOutId'];
    });
    if (this.driverInOutId > 0) {
      this.loadInOutData(this.driverInOutId);
    }

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

  async successToaster() {
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
    else if (this.driverInOutId > -1) {
      toast = await this.toaster.create({
        message: 'Driver details updated successfully.',
        duration: 2000,
        position: 'top',
        animated: true,
        color: "success",
        mode: "ios"
      });
    }
    else {
      toast = await this.toaster.create({
        message: 'Driver added successfully.',
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
      this.successToaster();
    }
  }
  editDetails(data) {
    const req = data;
    req.driverInOutId = Number(this.driverInOutId);
    req.isActive = this.driverData.isActive;
    req.refModifiedBy = this.transpoterId;
    console.log('req-->', req);

    this.inOutApi.editInOut(req, this.driverInOutId).subscribe(success => {
      console.log('success', success);
      this.successToaster();
      this.route.navigate(['driver-in-out']);
    }, failure => { console.log('failure', failure); });
  }
  saveNewDetails(data) {
    this.inOutApi.saveInOut(data).subscribe(success => {
      console.log('success', success);

    }, failure => { console.log('failure', failure); });
  }
}
