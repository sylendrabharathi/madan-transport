import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FileChooser, FileChooserOptions } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';

@Component({
  selector: 'app-manage-driver-create',
  templateUrl: './manage-driver-create.component.html',
  styleUrls: ['./manage-driver-create.component.scss'],
  providers: [DatePipe]
})
export class ManageDriverCreateComponent implements OnInit {
  date;
  currentYear;
  maxyear;
  newDriverForm = this.fb.group({
    driverName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    licenceNo: ['', [Validators.required, , Validators.minLength(10), Validators.maxLength(16)]],
    licenceValidity: ['', [Validators.required]],
    refOrgId: [3],
    refCustId: [],
    licenceDocument: ['',],
    refRoleId: ['']
  });
  licenseDocUrl = '';
  driverUserForm = this.fb.group({
    mailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cnfPassword: ['', [Validators.required]]
  });
  userForm = this.fb.group({
    refOrgid: [3],
    userName: [''],
    // refCreatedBy: [],
    email: [''],
    mobileNo: [''],
    password: [''],
    processing: ['0'],
    comments: [''],
    emailVerified: [true],
    RefEmpId: [null],
    refCustId: [null],
    RefDriverId: [null],
    RefConsignerId: [null]
  });
  driverId = -1;
  transpoterId;
  userId;
  driverIns: any = {};
  role: any;
  editUserId: number;
  constructor(private fb: FormBuilder,
    private driverApi: ManageDriverApiService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toast: ToastService,
    private datePipe: DatePipe,
    private fileChooser: FileChooser,
    private ls: LocalStorageService,
    private fileTransfer: FileTransfer,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    this.userId = Number(this.ls.getUserId())
    this.newDriverForm.get('refCustId').setValue(this.transpoterId);
    this.driverIns = {};
    this.aRoute.params.subscribe(data => {
      this.driverId = data.driverId;
      this.editUserId = data.userId;
      console.log('this.driverId', this.driverId);
    });
    this.loadDates();
    if (this.driverId > -1) {
      this.getDriver(this.driverId);
    }
    this.getsetRoleId();

  }
  getsetRoleId() {
    this.driverApi.getRole('Driver').subscribe(success => {
      console.log('success', success);
      this.role = success[0];
      this.newDriverForm.get('refRoleId').setValue(this.role.roleId);
    }, failure => {
      console.log('failure', failure);
    });

  }
  loadDates() {
    this.date = new Date();
    this.currentYear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
    this.date.setFullYear(this.date.getFullYear() + 20);
    this.maxyear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
  }

  getDriver(driverId) {
    this.loader.createLoader();
    this.driverApi.getDriver(driverId).subscribe((success: any) => {
      console.log('driver success', success);
      this.driverIns = JSON.parse(JSON.stringify(success.value));
      this.driverApi.getUser(this.editUserId).subscribe(success => {
        console.log('success', success);
        this.setUserDataforForm(success[0]);
        // this.loader.dismissLoader();
      }, failure => {
        this.loader.dismissLoader();
        console.log('driver user failure', failure);
      });
      this.setFormData(success.value);
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
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
  setUserDataforForm(data) {
    this.driverUserForm.get('mailId').setValue(data.email);
    this.driverUserForm.get('password').setValue(data.password);
  }
  submit() {
    if (this.newDriverForm.valid && this.driverUserForm.valid && this.licenseDocUrl != '') {
      this.loader.createLoader();
      const req: any = this.newDriverForm.value;
      console.log('inside');
      this.fileUpload(req);

    }
    else {
      console.log('else');
      // this.failure = true;
      this.toast.danger('Fill/Upload all required fields');
      this.newDriverForm.markAllAsTouched();
      this.newDriverForm.updateValueAndValidity();
      this.driverUserForm.markAllAsTouched();
      this.driverUserForm.updateValueAndValidity();

    }
  }

  editDriver(req) {
    req.driverId = this.driverIns.driverId;
    req.isActive = this.driverIns.isActive;
    req.RefModifiedBy = this.userId;
    console.log('-->', req);
    this.driverApi.editDriver(req, this.driverId).subscribe(success => {

      console.log('success', success);
      if (success[0].status == 1) {
        // this.toast.success(success[0].msg);
        this.edit(req, success[0].id);
      }
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      })
  }

  saveDriver(req) {
    req.RefCreatedBy = this.userId;
    console.log('==>', req);
    this.driverApi.saveDriver(req).subscribe(success => {
      console.log('success', success);
      // this.loader.dismissLoader();
      if (success[0].status == 1) {
        // this.toast.success(success[0].msg);
        this.saveUser(req, success[0].id);
      }
      else {
        this.toast.warning(success[0].msg);
        return;
      }
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      })
  }



  saveUser(req, newDriverId) {
    const userReq = this.setUserData(req, newDriverId);
    userReq.refCreatedBy = this.userId;
    console.log('userReq', userReq);

    this.driverApi.addUser(userReq).subscribe(success => {
      this.loader.dismissLoader();
      console.log('user success', success);
      if (success[0].status == 1) {
        this.toast.success(success[0].msg);
        this.router.navigate(['manage-driver']);
      }
      else {
        this.toast.warning(success[0].msg);
        return;
      }
    }, failure => {
      this.loader.dismissLoader();
      console.log('user failure', failure);
      this.toast.warning(failure.error);
      return;
    });
  }
  edit(req, newDriverId) {
    const userReq = this.setUserData(req, newDriverId);
    userReq.refModifiedBy = this.userId;
    userReq.isActive = true;
    userReq.userId = Number(this.editUserId);
    this.driverApi.editUser(this.editUserId, userReq).subscribe(success => {
      this.loader.dismissLoader();
      console.log('user success', success);
      if (success[0].status == 2) {
        this.toast.success(success[0].msg);
        this.router.navigate(['manage-driver']);
      }
      else {
        this.toast.warning(success[0].msg);
        return;
      }
    }, failure => {
      this.loader.dismissLoader();
      console.log('user failure', failure);
      this.toast.danger(failure.error);
      return;
    });
  }
  setUserData(req, newDriverId) {
    console.log('--', newDriverId);

    this.userForm.get('userName').setValue(req.driverName);
    this.userForm.get('mobileNo').setValue(req.mobileNo);
    this.userForm.get('password').setValue(this.driverUserForm.get('password').value);
    this.userForm.get('email').setValue(this.driverUserForm.get('mailId').value);
    this.userForm.get('comments').setValue(this.role.roleName);
    this.userForm.get('RefDriverId').setValue(newDriverId);
    return this.userForm.value;
  }

  chooseFile() {
    console.log('chooseFile');
    if (!this.newDriverForm.get('licenceNo').value) {
      this.toast.warning('Please enter license no before uploading document');
      return;
    }
    const options: FileChooserOptions = {
      mime: '"application/pdf"'
    }
    this.fileChooser.open(options).then((resp) => {
      console.log(resp);
      this.licenseDocUrl = resp.toString();

    }).catch((err) => {
      console.log(err);

    })
  }

  fileUpload(req) {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    // const 
    const options: FileUploadOptions = {
      fileKey: 'file',
      params: {
        filename: `${req.licenceNo}DriverLicence.pdf`
      }
    };

    const licenseDocURL = `F:/DriverLicenceDocument/${req.licenceNo}DriverLicence.pdf`;
    req.licenceDocument = licenseDocURL;

    fileTransfer.upload(this.licenseDocUrl, `${environment.serverUrl}Common/PostdriverUploads/?file`, options).then((res) => {
      console.log(res);
      if (this.driverId > -1) {
        this.editDriver(req);
      }
      else {
        this.saveDriver(req);
      }
    }).catch(err => {
      console.log(err);

    })

  }
}
