import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  submit() {
    this.router.navigate(['employee']);
  }

}
