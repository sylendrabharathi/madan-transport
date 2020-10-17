import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { EmployeeApiService } from '../service/api/employee-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: any = [];
  constructor(
    private router: Router,
    private employeeApi: EmployeeApiService,
    private loader: LoaderService,
    private alert: AlertServiceService,
    private toaster: ToastService
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getEmployeesList();
  }
  getEmployeesList() {
    this.loader.createLoader();
    this.employeeApi.getEmployeeById('').subscribe((success) => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.employeeList = success;
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);

      }
    );
  }
  deleteEmployee(employeeId) {
    this.alert.alertPromt(`Are you sure you want to delete? `).then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        let req: any = {};
        req.employeeId = employeeId;
        req.refModifiedBy = 1;
        this.employeeApi.deleteEmployee(employeeId, req).subscribe(success => {
          this.loader.dismissLoader();
          if (success[0].status == 3) {
            this.toaster.success(success[0].msg);
            this.ionViewWillEnter();
          }
          else
            this.toaster.danger(success[0].msg);
        }, failure => {
          this.loader.dismissLoader();
        })
      }
    });
  }
  newEmployee() {
    this.router.navigate(['employee', 'new']);

  }
  editEmployee(employeeId) {
    this.router.navigate(['employee', employeeId, 'edit']);
  }

}
