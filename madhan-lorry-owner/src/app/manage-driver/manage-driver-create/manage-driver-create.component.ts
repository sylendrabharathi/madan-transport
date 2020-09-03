import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manage-driver-create',
  templateUrl: './manage-driver-create.component.html',
  styleUrls: ['./manage-driver-create.component.scss'],
})
export class ManageDriverCreateComponent implements OnInit {
  // editDriver:any = [];
  newDriverForm = this.fb.group({
    driverName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    licenceNo: ['', [Validators.required]],
    licenceValidity: ['', [Validators.required]],
    refOrgId: [''],
    refCustId: [''],
    licenceDocument: ['c:']
    // refCreatedBy: ['']
    // password: [''],
    // cnfPassword: ['']
  });
  driverId = -1;
  transpoterId = 4;
  driverIns: any = {};
  failure: boolean = false;
  constructor(private fb: FormBuilder,
    private driverApi: ManageDriverApiService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toaster: ToastController) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.driverIns = {};
    this.aRoute.params.subscribe(data => {
      this.driverId = data.driverId;
      console.log('this.driverId', this.driverId);
    });
    if (this.driverId > -1) {
      this.getDriver(this.driverId);
    }
  }

  getDriver(driverId) {
    this.driverApi.getDriver(driverId).subscribe((success: any) => {
      console.log('driver success', success);
      this.driverIns = JSON.parse(JSON.stringify(success.value));
      this.setFormData(success.value);
    },
      failure => {
        console.log('driver failure', failure);
      })
  }
  setFormData(data) {
    this.newDriverForm.get('driverName').setValue(data.driverName);
    this.newDriverForm.get('mobileNo').setValue(data.mobileNo);
    this.newDriverForm.get('licenceNo').setValue(data.licenceNo);
    this.newDriverForm.get('licenceValidity').setValue(data.licenceValidity);
    this.newDriverForm.get('refOrgId').setValue(data.refOrgId);
    this.newDriverForm.get('refCustId').setValue(data.refCustId);
    this.newDriverForm.updateValueAndValidity();
  }
  submit() {

    if (this.newDriverForm.valid) {

      const req: any = this.newDriverForm.value;
      console.log('inside');
      if (this.driverId > -1) {
        req.driverId = this.driverIns.driverId;
        req.isActive = this.driverIns.isActive;
        req.RefModifiedBy = this.transpoterId;
        console.log('-->', req);
        this.driverApi.editDriver(req.value, this.driverId).subscribe(success => {
          console.log('success', success);
          this.successToaster();
          this.router.navigate(['manage-driver']);
        },
          failure => {
            console.log('failure', failure);
          })
      }
      else {
        req.RefCreatedBy = this.transpoterId;
        console.log('==>', req);
        this.driverApi.saveDriver(req.value).subscribe(success => {
          console.log('success', success);
          this.successToaster();
          this.router.navigate(['manage-driver']);
        },
          failure => {
            console.log('failure', failure);
          })
      }
    }
    else {
      console.log('else');
      this.failure = true;
      this.successToaster();
      this.newDriverForm.markAllAsTouched();
      this.newDriverForm.updateValueAndValidity();
    }
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
    else if (this.driverId != -1) {
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
}
