import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employeeList = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getDetails();
  }
  getDetails() {
    for (let i = 0; i < 15; i++) {
      const employee = {
        firstName: 'FirstName',
        lastName: 'LastName',
        gender: 'M',
        phoneNumber: 99999999
      };
      this.employeeList.push(employee);
    }
  }

  newEmployee() {
    this.router.navigate(['employee', 'new']);

  }

}
