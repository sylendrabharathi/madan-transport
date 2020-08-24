import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverInOutApiService } from '../services/api/driver-in-out-api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-driver-in-out',
  templateUrl: './new-driver-in-out.component.html',
  styleUrls: ['./new-driver-in-out.component.scss'],
})
export class NewDriverInOutComponent implements OnInit {

  drivers: any = [];
  vehicles: any = [];
  timeForm = this.fb.group({
    driverName: ['', [Validators.required]],
    vehicleNumber: ['', [Validators.required]],
    inTime: ['', [Validators.required]],
    outTime: ['', [Validators.required]]
  });
  driverInOutId = 0;
  constructor(private route: Router,
    private inOutApi: DriverInOutApiService,
    private fb: FormBuilder,
    private aroute: ActivatedRoute) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getVehicleDetails(4);
    this.getDriverDetails(4);
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
        this.setDataToForm(success[0]);
      },
      failure => {
        console.log('failure', failure);
      }
    );
  }
  setDataToForm(data) {
    this.timeForm.get('driverName').setValue(data.refDriverId);
    // console.log('data.refVehicleId', data.refVehicleId);
    this.timeForm.get('vehicleNumber').setValue(data.refVehicleId);
    this.timeForm.get('inTime').setValue(data.inTime);
    this.timeForm.get('outTime').setValue(data.outTime);
    this.timeForm.updateValueAndValidity();
  }
}
