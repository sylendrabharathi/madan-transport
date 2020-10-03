import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm = this.fb.group({
    refOrgId: [3],
    refRoleId: [''],
    // refCreatedBy: null,
    value: [''],
    firstName: [''],
    lastName: [''],
    gender: [''],
    dob: [],
    doj: [''],
    email: [''],
    mobileNo: [''],
    empStatus: [],
    noticePeriod: [],
    nationality: [''],
    refReferenceListCityId: [],
    refReferenceListStateId: [],
    refReferenceListCountryId: [],
    address1: [''],
    address2: [''],
    address3: [''],
    address4: ['']
  });

  constructor(private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() { }
  submit() {
    this.router.navigate(['employee']);
  }

}
