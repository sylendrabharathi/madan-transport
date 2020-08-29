import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-driver-create',
  templateUrl: './manage-driver-create.component.html',
  styleUrls: ['./manage-driver-create.component.scss'],
})
export class ManageDriverCreateComponent implements OnInit {
  // editDriver:any = [];
  newDriverForm = this.fb.group({
    driverName: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    licenceNo: ['', [Validators.required]],
    licenceValidity: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    cnfPassword: ['', [Validators.required, Validators.minLength(7)]]
  });
  driverId = -1;
  constructor(private fb: FormBuilder,
    private driverApi: ManageDriverApiService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.aRoute.params.subscribe(data => {
      this.driverId = data.driverId;
      console.log('this.driverId', this.driverId);
    });
    if (this.driverId != -1) {
      this.getDriver(this.driverId);
    }
  }

  getDriver(driverId) {
    this.driverApi.getDriver(driverId).subscribe((success: any) => {
      console.log('driver success', success);
      this.setFormData(success.value);
    },
      failure => {
        console.log('driver failure', failure);
      })
  }
  setFormData(data) {
    this.newDriverForm.get('driverName').setValue(data.driverName);
    this.newDriverForm.get('mobile').setValue(data.mobileNo);
    this.newDriverForm.get('licenceNo').setValue(data.licenceNo);
    this.newDriverForm.get('licenceValidity').setValue(data.licenceValidity);
    // this.newDriverForm.get('licenceValidity').setValue(data.licenceValidity);
    this.newDriverForm.updateValueAndValidity();
  }

}
