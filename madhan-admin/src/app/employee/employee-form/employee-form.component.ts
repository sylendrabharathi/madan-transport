import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { EmployeeApiService } from '../service/api/employee-api.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm = this.fb.group({
    refOrgId: [3],
    refRoleId: [3],
    value: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    doj: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    empStatus: [, [Validators.required]],
    noticePeriod: [, [Validators.required]],
    nationality: ['', [Validators.required]],
    refReferenceListCityId: [, [Validators.required]],
    refReferenceListStateId: [, [Validators.required]],
    refReferenceListCountryId: [, [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    address3: [''],
    address4: ['', [Validators.required]]
  });
  intialLists: any = {};
  editEmployeeId: number = -1;
  isEdit = false;
  editEmployeeData: any = [];
  constructor(private router: Router,
    private fb: FormBuilder,
    private employeeApi: EmployeeApiService,
    private toaster: ToastService,
    private arouter: ActivatedRoute,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.loadIntialValues('city', 'cityList');
    this.loadIntialValues('state', 'stateList');
    this.loadIntialValues('country', 'countryList');
    this.arouter.params.subscribe(data => {
      this.editEmployeeId = Number(data.employeeId);
    });
    if (this.editEmployeeId > -1) {
      this.isEdit = true;
      this.loadEditData();
    }
  }
  loadEditData() {
    this.loader.createLoader();
    this.employeeApi.getEmployeeById(this.editEmployeeId).subscribe(success => {
      this.loader.dismissLoader();
      console.log('suc', success);
      this.editEmployeeData = success[0];
      this.setEditData();      // this.employeeForm.set
    }, failure => {
      this.loader.dismissLoader();
      console.log('fail', failure);

    });
  }
  setEditData() {

    this.employeeForm.get('value').setValue(this.editEmployeeData.value);
    this.employeeForm.get('firstName').setValue(this.editEmployeeData.firstName);
    this.employeeForm.get('lastName').setValue(this.editEmployeeData.lastName);
    this.employeeForm.get('gender').setValue(this.editEmployeeData.gender);
    this.employeeForm.get('dob').setValue(this.editEmployeeData.dob);
    this.employeeForm.get('doj').setValue(this.editEmployeeData.doj);
    this.employeeForm.get('email').setValue(this.editEmployeeData.email);
    this.employeeForm.get('mobileNo').setValue(this.editEmployeeData.mobileNo);
    this.employeeForm.get('empStatus').setValue(this.editEmployeeData.empStatus);
    this.employeeForm.get('noticePeriod').setValue(this.editEmployeeData.noticePeriod);
    this.employeeForm.get('nationality').setValue(this.editEmployeeData.nationality);
    this.employeeForm.get('refReferenceListCityId').setValue(this.editEmployeeData.refReferenceListCityId);
    this.employeeForm.get('refReferenceListStateId').setValue(this.editEmployeeData.refReferenceListStateId);
    this.employeeForm.get('refReferenceListCountryId').setValue(this.editEmployeeData.refReferenceListCountryId);
    this.employeeForm.get('address1').setValue(this.editEmployeeData.address1);
    this.employeeForm.get('address2').setValue(this.editEmployeeData.address2);
    this.employeeForm.get('address3').setValue(this.editEmployeeData.address3);
    this.employeeForm.get('address4').setValue(this.editEmployeeData.address4);
    this.employeeForm.updateValueAndValidity();
  }
  loadIntialValues(getname, listname) {
    this.employeeApi.getReferenceList(getname).subscribe(success => {
      console.log('success', success);
      this.intialLists[listname] = success;
    }, failure => { console.log('failure', failure); });
  }

  submit() {
    if (this.employeeForm.valid) {
      if (this.editEmployeeId > -1) {
        this.editEmployee(this.employeeForm.value);
        return;
      }
      this.saveEmployee(this.employeeForm.value);
      return;

    }
    else {
      this.employeeForm.markAsDirty();
      this.employeeForm.markAllAsTouched();
      this.employeeForm.updateValueAndValidity();
      this.toaster.danger('Fill all the details');
    }
  }
  editEmployee(req) {
    req.isActive = this.editEmployeeData.isActive;
    req.refModifiedBy = 3;
    req.employeeId = this.editEmployeeId;
    this.loader.createLoader();
    this.employeeApi.editEmployee(this.editEmployeeId, req).subscribe(
      success => {
        this.loader.dismissLoader();
        console.log('success', success);
        if (success[0].status == 2) {
          this.toaster.success(success[0].msg);
          this.router.navigate(['employee']);
          return;
        }
        this.toaster.danger(success[0].msg);
      },
      failure => {
        this.loader.dismissLoader();
        this.toaster.danger(failure);
        console.log(failure);
      });
  }
  saveEmployee(req) {
    req.refCreatedBy = 1;
    this.loader.createLoader();
    this.employeeApi.addEmployee(req).subscribe(
      success => {
        this.loader.dismissLoader();
        console.log('success', success);
        if (success[0].status == 1) {
          this.toaster.success(success[0].msg);
          this.router.navigate(['employee']);
          return;
        }
        this.toaster.danger(success[0].msg);
      },
      failure => {
        this.loader.dismissLoader();
        this.toaster.danger(failure[0].msg);
        console.log(failure);
      });
  }
}
