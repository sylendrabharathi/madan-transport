import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-driver-create',
  templateUrl: './manage-driver-create.component.html',
  styleUrls: ['./manage-driver-create.component.scss'],
  providers: [DatePipe]
})
export class ManageDriverCreateComponent implements OnInit {
  // editDriver:any = [];
  date;
  currentYear;
  maxyear;
  newDriverForm = this.fb.group({
    driverName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
    licenceNo: ['', [Validators.required]],
    licenceValidity: ['', [Validators.required]],
    refOrgId: [3],
    refCustId: [],
    licenceDocument: ['c:'],
  });
  driverUserForm = this.fb.group({
    mailId: ['', [Validators.required]],
    password: ['', [Validators.required]],
    cnfPassword: ['', [Validators.required]]
  })
  userForm = this.fb.group({
    refOrgid: [3],
    userName: [''],
    email: [''],
    mobileNo: [''],
    password: [''],
    processing: [],
    comments: [''],
    emailVerified: [],
    RefEmpId: [null],
    refCustId: [null]
  });
  driverId = -1;
  transpoterId;
  driverIns: any = {};

  constructor(private fb: FormBuilder,
    private driverApi: ManageDriverApiService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toaster: ToastController,
    private datePipe: DatePipe) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(localStorage.getItem('TranspoterId'));
    this.newDriverForm.get('refCustId').setValue(this.transpoterId);
    this.loadDates();
    this.driverIns = {};
    this.aRoute.params.subscribe(data => {
      this.driverId = data.driverId;
      console.log('this.driverId', this.driverId);
    });
    if (this.driverId > -1) {
      this.getDriver(this.driverId);
    }
  }

  loadDates() {
    this.date = new Date();
    this.currentYear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
    this.date.setFullYear(this.date.getFullYear() + 20);
    this.maxyear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
  }

  getDriver(driverId) {
    this.driverApi.getDriver(driverId).subscribe((success: any) => {
      console.log('driver success', success);
      this.driverIns = JSON.parse(JSON.stringify(success.value));
      // this.driverApi.
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
    if (this.newDriverForm.valid && this.driverUserForm.valid) {
      const req: any = this.newDriverForm.value;
      console.log('inside');
      if (this.driverId > -1) {
        this.editDriver(req);
      }
      else {
        this.saveDriver(req);
      }
    }
    else {
      console.log('else');
      // this.failure = true;
      this.successToaster('Fill all required fields', 'danger');
      this.newDriverForm.markAllAsTouched();
      this.newDriverForm.updateValueAndValidity();
      this.driverUserForm.markAllAsTouched();
      this.driverUserForm.updateValueAndValidity();

    }
  }

  editDriver(req) {
    req.driverId = this.driverIns.driverId;
    req.isActive = this.driverIns.isActive;
    req.RefModifiedBy = this.transpoterId;
    console.log('-->', req);
    this.driverApi.editDriver(req, this.driverId).subscribe(success => {
      console.log('success', success);
      this.successToaster(success[0].msg, 'success');
      this.router.navigate(['manage-driver']);
    },
      failure => {
        console.log('failure', failure);
      })
  }

  saveDriver(req) {
    req.RefCreatedBy = this.transpoterId;
    console.log('==>', req);
    this.driverApi.saveDriver(req).subscribe(success => {
      console.log('success', success);
      this.saveUser(req);
      this.successToaster(success[0].msg, 'success');
      this.router.navigate(['manage-driver']);
    },
      failure => {
        console.log('failure', failure);
      })
  }

  async successToaster(message, color) {
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

  saveUser(req) {
    const userReq = this.setUserData(req);
    userReq.refCreatedBy = this.newDriverForm.get('refCustId').value;
    this.driverApi.addUser(req).subscribe(success => {
      console.log('user success', success);
    }, failure => { console.log('user failure', failure); });
  }

  setUserData(req) {
    this.userForm.get('userName').setValue(req.driverName);
    this.userForm.get('mobileNo').setValue(req.mobileNo);
    this.userForm.get('password').setValue(this.driverUserForm.get('password').value);
    this.userForm.get('email').setValue(this.driverUserForm.get('mailId').value);
    this.userForm.get('comments').setValue('Driver');
    return this.userForm.value;
  }
}
